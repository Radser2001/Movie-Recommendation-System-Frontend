import React from "react";
import { isEmpty } from "lodash";
import RecommendedMovieCard from "./RecommendedMovieCard";

interface MovieListProps {
  data: Record<string, any>[];
}

const RecommendedMovieList: React.FC<MovieListProps> = ({ data }) => {
  if (isEmpty(data)) {
    return null;
  }
  console.log(data[0]);

  return (
    <div className="px-4 mt-12 md:px-12 space-y-8">
      <div>
        <p className="text-white text-md text-3xl font-semibold mb-4">
          Recommended Movies
        </p>
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12">
          {data.length > 0 &&
            data?.map((movie) => (
              <RecommendedMovieCard key={movie.id} data={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedMovieList;
