import React from "react";
import { usedp } from "../contextComp/context";
import { NavLink } from "react-router-dom";

const imgUrl = "https://via.placeholder.com/200/200";

const Movie: React.FC = () => {
  const { movie, isLoading, isError } = usedp();

  if (isLoading) {
    return <div className="loading">Loading....</div>;
  } else if (isError.show) {
    console.log(isError.msg);
    return;
  }
  return (
    <>
      <section className="movie-page">
        <div className="grid grid-4-col">
          {movie
            ? movie.map((currMovieElem) => {
                const { imdbID, Title, Poster } = currMovieElem;
                const movieName = Title.substring(0, 15);

                return (
                  <NavLink to={`movie/${imdbID}`} key={imdbID}>
                    <div className="card">
                      <div className="card-info">
                        <h2>
                          {movieName.length > 13
                            ? `${movieName}...`
                            : movieName}
                        </h2>
                        <img src={Poster === "N/A" ? imgUrl : Poster} alt="#" />
                      </div>
                    </div>
                  </NavLink>
                );
              })
            : ""}
        </div>
      </section>
    </>
  );
};

export default Movie;
