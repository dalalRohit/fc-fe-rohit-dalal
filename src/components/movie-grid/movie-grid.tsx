"use client";

import { useEffect, useState, Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import styles from "./grid.module.css";
import Card from "@/components/movie-card/movie-card";
import getMoviesByYear from "@/lib/fetch-movies";

let defaultYear = 2012;
const MovieGrid = () => {
  const [prevYear, setPrevYear] = useState(defaultYear - 1);
  const [nextYear, setNextYear] = useState(defaultYear + 1);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const { ref: upRef, inView: upInView } = useInView({
    threshold: 0.25,
  });

  const { data, fetchNextPage, fetchPreviousPage } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: ({ pageParam }) => {
      return getMoviesByYear(pageParam);
    },
    initialPageParam: defaultYear,
    getPreviousPageParam: () => (prevYear >= 2000 ? prevYear : undefined),
    getNextPageParam: () =>
      nextYear <= new Date().getFullYear() ? nextYear : undefined,
  });

  useEffect(() => {
    if (inView) {
      setNextYear((prevNextYear) => prevNextYear + 1);
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (upInView) {
      setPrevYear((prevPrevYear) => prevPrevYear - 1);
      fetchPreviousPage();
    }
  }, [upInView, fetchPreviousPage]);

  return (
    <div className={styles.grid}>
      {/* <button ref={upRef}>{upInView ? "Visible" : "Not visible"}</button> */}

      {data?.pages.map((page) => {
        const releaseYear = new Date(
          page?.results?.[0]?.release_date
        ).getFullYear();
        return (
          <Fragment key={releaseYear}>
            <h1 className={styles.title}>{releaseYear}</h1>
            <div className={styles.cards}>
              {page?.results?.map((movie: any, key: number) => (
                <Card key={`movie-${releaseYear}-${key}`} {...movie} />
              ))}
            </div>
          </Fragment>
        );
      })}

      <button ref={ref}>{inView ? "Visible" : "Not visible"}</button>
    </div>
  );
};

export default MovieGrid;
