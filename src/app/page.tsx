import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import MovieGrid from "@/components/movie-grid/movie-grid";
import getQueryClient from "@/lib/query-client";
import getMoviesByYear from "@/lib/fetch-movies";

export default async function Home() {
  const queryClient = getQueryClient();

  //pre-fetch movies for 2012 on server
  await queryClient.fetchInfiniteQuery({
    queryKey: ["movies"],
    queryFn: () => getMoviesByYear(2012),
    initialPageParam: 2012,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieGrid />
    </HydrationBoundary>
  );
}
