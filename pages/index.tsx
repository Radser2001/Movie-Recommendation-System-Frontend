import React, { useEffect } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import useMovieList from "@/hooks/useMovieList";
import useInforModal from "@/hooks/useInfoModalStore";
import RecommendedMovieList from "@/components/RecommendedMovieList";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: allMovies = [] } = useMovieList();
  const { isOpen, closeModal } = useInforModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(searchQuery);
  };
  useEffect(() => {
    const fetchRecommendedMovies = () => {
      fetch(`http://127.0.0.1:5000/recommended_movies/${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setRecommendedMovies(data.recommended_movies_search);
        });
    };
    setRecommendedMovies([]);

    fetchRecommendedMovies();
    setIsLoading(false);
  }, [searchQuery]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar onSearch={handleSearch} />
      <div className="pb-40">
        <MovieList title="Trending Now" data={filteredMovies} />

        {isLoading && <p className="text-white">Loading...</p>}
        {searchQuery != "" && recommendedMovies.length != 0 && (
          <div>
            <RecommendedMovieList data={recommendedMovies} />
          </div>
        )}
      </div>
    </>
  );
}
