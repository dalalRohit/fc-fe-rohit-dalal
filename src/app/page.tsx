import { instance } from "@/lib/axios-instance";
import styles from "./page.module.css";
import Card from "@/components/movie-card/movie-card";
import MovieGrid from "@/components/movie-grid/movie-grid";

let deafaultYear = "2012";
export default async function Home() {
  const { data } = await instance.get("", {
    params: {
      sort_by: "popularity.desc",
      primary_release_year: deafaultYear,
      page: "1",
      "vote_count.gte": "100",
    },
  });

  return (
    <main className={styles.main}>
      <MovieGrid year={deafaultYear}>
        {data?.results?.map((movie: any, key: number) => {
          return <Card key={key} {...movie} />;
        })}
      </MovieGrid>
    </main>
  );
}
