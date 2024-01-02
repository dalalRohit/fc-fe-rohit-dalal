import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import MovieGrid from "@/components/movie-grid/movie-grid";
import getQueryClient from "@/lib/query-client";
import { getMovieGenres, getMoviesByYear } from "@/lib/fetchers";
import Header from "@/components/header/header";
import CategoryLoader from "@/components/loaders/category-loader";

export default async function Home() {
  const queryClient = getQueryClient();

  //pre-fetch movies for 2012 on server
  await queryClient.fetchInfiniteQuery({
    queryKey: ["movies"],
    queryFn: () => getMoviesByYear(2012),
    initialPageParam: 2012,
  });

  //fetch all genres
  await queryClient.fetchQuery({
    queryKey: ["genres"],
    queryFn: getMovieGenres,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <div className="grid-wrapper">
        {/* <CategoryLoader /> */}
        <MovieGrid />
      </div>
    </HydrationBoundary>
  );
}
