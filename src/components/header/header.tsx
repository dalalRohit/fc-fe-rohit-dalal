"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

import styles from "./header.module.css";
import { getMovieGenres } from "@/lib/fetchers";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedGenre = searchParams?.get("genre");

  const { data } = useQuery({
    queryKey: ["genres"],
    queryFn: getMovieGenres,
  });

  const onGenreClick = (genreId?: number) => {
    if (typeof window === "undefined") return;
    if (!genreId) router.push("/");
    /*
		https://github.com/vercel/next.js/pull/58335
    Adds experimental shallow routing setup 
		*/ else {
      const data = {
        genre: genreId,
      };
      const url = `/?genre=${genreId}`;
      window.history.replaceState(data, "", url);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span>MOVIEFLIX</span>
        </div>

        <div className={styles.genres}>
          <span
            onClick={() => onGenreClick()}
            className={`chip ${selectedGenre === null ? "selected" : ""}`}
          >
            All
          </span>
          {data?.genres?.map((genre: any) => {
            return (
              <span
                onClick={() => onGenreClick(genre?.id)}
                key={genre?.id}
                className={`chip ${
                  genre?.id === Number(selectedGenre) ? "selected" : ""
                }`}
              >
                {genre?.name}
              </span>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
