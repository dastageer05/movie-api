import React from "react";
import Movie from "./Movie";
import Search from "./Search";
const Home: React.FC = () => {
  return (
    <>
      <div className="container">
        <Search />
        <Movie />
      </div>
    </>
  );
};

export default Home;
