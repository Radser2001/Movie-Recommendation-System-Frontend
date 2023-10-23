import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import useMovieList from "@/hooks/useMovieList";
import useInforModal from "@/hooks/useInfoModalStore";

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
  const { data: movie = [] } = useMovieList();
  console.log(movie);
  const { isOpen, closeModal } = useInforModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movie} />
      </div>
    </>
  );
}
