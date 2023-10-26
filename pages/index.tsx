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
import useCurrentUser from "@/hooks/useCurrentUser";

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
  const [genrebasedMovies, setGenrebasedMovies] = useState([]);

  const {data: currentUser } = useCurrentUser();

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredMovies)
  // console.log(currentUser.currentUser.email)

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(query);
    console.log(searchQuery);
  };
  useEffect(() => {
    const fetchRecommendedMovies = () => {
      fetch(`http://127.0.0.1:5000/search_based_recommended_movies/${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setRecommendedMovies(data.recommended_movies_search);
        });
    };
    setRecommendedMovies([]);

    fetchRecommendedMovies();
    // setIsLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    const fetchGenreBasedMovies = () => {
      fetch(`http://127.0.0.1:5000/recommended_movies/${currentUser?.currentUser?.email}`)
        .then((response) => response.json())
        .then((data) => {
          
          setGenrebasedMovies(data.recommended_movies_genre);
        });
    };
    setGenrebasedMovies([]);

    if(currentUser != undefined){
      fetchGenreBasedMovies();
    }

    // fetchGenreBasedMovies();
    setIsLoading(false);
  }, [currentUser]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar onSearch={handleSearch} />
      <div className="pb-40">
        <MovieList title="Trending Now" data={filteredMovies} />
        <MovieList title="Your Choice" data={genrebasedMovies} />

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