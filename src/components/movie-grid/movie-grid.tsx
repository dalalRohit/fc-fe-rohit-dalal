"use client";

import type { ReactNode } from "react";
import styles from "./grid.module.css";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/movie-card/movie-card";
import getMoviesByYear from "@/lib/fetch-movies";

type MovieGridProps = {
  children?: ReactNode;
  year: string;
};

const MovieGrid = ({ year }: MovieGridProps) => {
  const { data } = useQuery({
    queryKey: ["movies", year],
    queryFn: () => getMoviesByYear(year),
  });

  return (
    <div className={styles.grid}>
      <h1 className={styles.title}>{year}</h1>
      <div className={styles.cards}>
        {data?.results?.map((movie: any, key: number) => {
          return <Card key={key} {...movie} />;
        })}
      </div>
    </div>
  );
};

export default MovieGrid;
