import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }
  console.log(data);

  return (
    <div className="px-4 mt-12 md:px-12 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-3xl font-semibold mb-4">
          {title}
        </p>
        <div className=" mt-24 grid grid-cols-4 gap-2">
          {data.length > 0 &&
            data?.map((movie) => <MovieCard key={movie.id} data={movie} />)}
        </div>
      </div>
    </div>
  );
};

export default MovieList;