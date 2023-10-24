import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import Modal from "react-modal";

interface MovieCardProps {
  data: Record<string, any>;
  response: Record<string, any>;
  movieData: Record<string, any>;
}

const RecommendedMovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieData, setMovieData] = useState({} as Record<string, any>);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(data.id);

  const fetchMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${data.id}?api_key=301792a4273987f9a78e06be25122c46&language=en-US`
    );
    const movieData = await response.json();
    setMovieData(movieData.poster_path);
  };

  fetchMovieDetails();

  https: return (
    <div className="group">
      <div
        className="bg-zinc-900 text-xl font-semibold col-span relative rounded-lg p-4 hover:shadow-lg transition duration-200"
        style={{ backgroundColor: "#414654" }}
      >
        <p className="text-white">{data.title}</p>
        <img
          className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          ]
        "
          src={`https://image.tmdb.org/t/p/w500/${movieData}`}
          alt=""
        />
        <div className="expand-icon" onClick={openModal}>
          <CgDetailsMore size={30} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            backgroundColor: "#575757",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "20px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            maxHeight: "80vh",
            overflow: "auto",
          },
        }}
      >
        <div className="modal-content">
          <h2 style={{ fontWeight: "bold" }}>{data.title}</h2>
          <br />

          <p>{data.overview}</p>
          {/* Add additional movie details here */}
          <p>Release Date: {data.release_date}</p>

          <br />
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default RecommendedMovieCard;
