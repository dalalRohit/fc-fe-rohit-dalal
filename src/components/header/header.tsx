"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import styles from "./header.module.css";
import { getMovieGenres } from "@/lib/fetchers";

const Header = () => {
  const searchParams = useSearchParams();
  const selectedGenre = searchParams?.get("genre");

  const { data } = useQuery({
    queryKey: ["genres"],
    queryFn: getMovieGenres,
  });

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span>MOVIEFLIX</span>
        </div>

        <div className={styles.genres}>
          <Link
            href={"/"}
            scroll={false}
            className={`chip ${selectedGenre === null ? "selected" : ""}`}
          >
            All
          </Link>
          {data?.genres?.map((genre: any) => {
            return (
              <Link
                href={`/?genre=${genre?.id}`}
                scroll={false}
                key={genre?.id}
                className={`chip ${
                  genre?.id === Number(selectedGenre) ? "selected" : ""
                }`}
              >
                {genre?.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
