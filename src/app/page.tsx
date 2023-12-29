import MovieGrid from "@/components/movie-grid/movie-grid";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/query-client";
import getMoviesByYear from "@/lib/fetch-movies";

let deafaultYear = "2012";
export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movies", deafaultYear],
    queryFn: () => getMoviesByYear(deafaultYear),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieGrid year={deafaultYear} />
    </HydrationBoundary>
  );
}
