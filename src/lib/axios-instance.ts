import axios from "axios";

const instance = axios.create({
  //&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100
  baseURL: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`,
});

export { instance };
