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

export default getMoviesByYear;
