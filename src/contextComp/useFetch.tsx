import { useState, useEffect } from "react";

export type MovieType = Array<{
  imdbID: string;
  [key: string]: any; // Allow other properties, in case the response has additional fields
}>;

export interface ErrorType {
  show: boolean;
  msg: string;
}

export const API_URL = `https://www.omdbapi.com/?&apikey=${
  import.meta.env.VITE_REACT_APP_MOVIE_KEY
}`;

const useFetch = (apiParams: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<ErrorType>({ show: false, msg: "" });
  const [movie, setMovie] = useState<MovieType>([]);

  const getMovie = async (url: string) => {
    setIsLoading(true);
    setIsError({ show: false, msg: "" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setMovie(data.Search || data); // Set the movie data only if Response is "True"
      } else {
        setIsError({ show: true, msg: data.Error || "Error fetching data." });
      }
    } catch (error) {
      setIsError({ show: true, msg: "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  // debouncing in react js
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovie(`${API_URL}&s=${apiParams}`);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;
