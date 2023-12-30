import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
});

export { instance };
