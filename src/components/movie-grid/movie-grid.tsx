"use client";

import { useEffect, Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import styles from "./grid.module.css";
import Card from "@/components/movie-card/movie-card";
import { getMoviesByYear } from "@/lib/fetchers";

const MovieGrid = () => {
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
    initialPageParam: 2012,
    getPreviousPageParam: (page) => {
      const releaseYear = new Date(
        page?.results?.[0]?.release_date
      ).getFullYear();
      return releaseYear >= 2000 ? releaseYear - 1 : undefined;
    },
    getNextPageParam: (page) => {
      const releaseYear = new Date(
        page?.results?.[0]?.release_date
      ).getFullYear();
      return releaseYear < new Date().getFullYear()
        ? releaseYear + 1
        : undefined;
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (upInView) fetchPreviousPage();
  }, [upInView, fetchPreviousPage]);

  return (
    <>
      {/* <button ref={upRef}>{upInView ? "Visible" : "Not visible"}</button> */}

      {data?.pages.map((page) => {
        const releaseYear = new Date(
          page?.results?.[0]?.release_date
        ).getFullYear();

        return (
          <div className={styles.grid} key={releaseYear}>
            <h1 className={styles.title}>{releaseYear}</h1>
            <div className={styles.cards}>
              {page?.results?.map((movie: any, key: number) => (
                <Card key={`movie-${releaseYear}-${key}`} {...movie} />
              ))}
            </div>
          </div>
        );
      })}

      <button ref={ref}>{inView ? "Visible" : "Not visible"}</button>
    </>
  );
};

export default MovieGrid;
