import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import Modal from "react-modal";
import useRating from "@/hooks/useRating";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useCallback } from "react";

interface MovieCardProps {
  data: Record<string, any>;
  response: Record<string, any>;
  movieData: Record<string, any>;
}

const RecommendedMovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieData, setMovieData] = useState({} as Record<string, any>);
  const [rating, setRating] = useState(0);

  const { data: currentUser } = useCurrentUser();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log("User ID:", currentUser.currentUser.id);
    console.log("Movie ID:", data.movie_id);
    console.log("Rating:", newRating);
  };

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

  const handleRatingSubmit = useCallback(async () => {
    try {
      // Prepare the rating data
      const ratingData = {
        user_id: currentUser.currentUser.id,
        movie_id: data.movie_id,
        rating: rating,
      };

      // Make the API request to submit the rating
      await useRating(ratingData);

      // Handle the successful rating submission
      console.log("Rating submitted successfully!");
      window.alert("Rating submitted successfully!");
    } catch (error) {
      console.log(error);
    }
  }, [rating]);

  return (
    <div>
      <div className="mb-4 max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg "
            src={`https://image.tmdb.org/t/p/w500/${movieData}`}
            alt=""
          />
        </a>
        <div className="text-center p-5">
          <a href="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.title}
            </h5>
          </a>

          <a
            href="#"
            onClick={openModal}
            className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-md hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            More Info
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              backgroundColor: "#1F2937",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "650px",
              maxHeight: "80vh",
              overflow: "auto",
            },
          }}
        >
          <div className="modal-content">
            <h2 className="font-bold text-xl">{data.title}</h2>
            <br />

            <p className="flex flex-col">
              <span className="font-bold mb-1">Overview: </span>
              <span>{data.overview}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-bold mt-4 mb-1">Runtime: </span>
              <span>{data.runtime} minutes</span>
            </p>
            <p className="flex flex-col">
              <span className="font-bold mt-4 mb-1">Released Date: </span>
              <span>{data.release_date}</span>
            </p>

            <br />
            {/* add the rating here */}
            <p>Rate the Movie:</p>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className="cursor-pointer text-3xl"
                  onClick={() => handleRatingChange(value)}
                  style={{
                    color: rating >= value ? "gold" : "gray",
                  }}
                >
                  ★
                </span>
              ))}
              <p className="mt-4">Your Rating: {rating}</p>
            </div>

            <br />
            <button
              className="mr-4 bg-red-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="mr-1 bg-red-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
              onClick={handleRatingSubmit}
            >
              Submit
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RecommendedMovieCard;
