import { instance } from "@/lib/axios-instance";

const getMoviesByYear = async (year: number) => {
  const { data } = await instance.get("", {
    params: {
      sort_by: "popularity.desc",
      primary_release_year: year,
      page: "1",
      "vote_count.gte": "100",
    },
  });
  return data;
};

const getMovieGenres = async () => {
  const { data } = await instance({
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en`,
  });
  return data;
};

export { getMovieGenres, getMoviesByYear };
