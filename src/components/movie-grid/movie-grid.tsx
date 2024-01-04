"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";

import styles from "./grid.module.css";
import Card from "@/components/movie-card/movie-card";
import { getMoviesByYear } from "@/lib/fetchers";
import CategoryLoader from "@/components/loaders/category-loader";

const MovieGrid = () => {
  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get("genre");
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const { ref: upRef, inView: upInView } = useInView({
    threshold: 0,
  });

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
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
      /*
			NOTE: this should be 
			releaseYear < new Date().getFullYear().
			Hard-coding it to 2023 as no new movies for 2024 yet.
			*/
      return releaseYear < 2023 ? releaseYear + 1 : undefined;
    },

    select: (raw) => {
      const transformed = raw?.pages?.map((page, index) => {
        return { year: raw?.pageParams?.[index], results: page?.results };
      });
      return transformed;
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

      {data?.map((page) => {
        const releaseYear = page?.year;
        return (
          <div id={`${releaseYear}`} className={styles.grid} key={releaseYear}>
            <h1 className={styles.title}>{releaseYear}</h1>
            <div className={styles.cards}>
              {page?.results?.map((movie: any, key: number) => {
                if (
                  selectedGenre &&
                  !movie?.genre_ids?.includes(Number(selectedGenre))
                ) {
                  return null;
                } else
                  return (
                    <Card key={`movie-${releaseYear}-${key}`} {...movie} />
                  );
              })}
            </div>
          </div>
        );
      })}
      {isFetchingNextPage ? <CategoryLoader /> : null}

      <button style={{ visibility: "hidden" }} ref={ref}>
        Fetch more
      </button>
    </>
  );
};

export default MovieGrid;
