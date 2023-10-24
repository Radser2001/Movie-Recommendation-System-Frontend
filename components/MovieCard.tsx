import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import Modal from "react-modal";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import  submitRating  from '../pages/api/ratings';
import { useCallback} from "react";
import useRating from "@/hooks/useRating";

interface MovieCardProps {
  data: Record<string, any>;
  response: Record<string, any>;
  movieData: Record<string, any>;
}



const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieData, setMovieData] = useState({} as Record<string, any>);
  const [rating, setRating] = useState(0);

  const { data: currentUser } = useCurrentUser();
  // console.log(currentUser);

  

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

  const fetchMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${data.movie_id}?api_key=301792a4273987f9a78e06be25122c46&language=en-US`
    );
    const movieData = await response.json();
    setMovieData(movieData.poster_path);
  };

  fetchMovieDetails();


  const handleRatingSubmit =useCallback( async () => {
    try {
      // Prepare the rating data
      const ratingData = {
        user_id: currentUser.currentUser.id,
        movie_id: data.movie_id,
        rating: rating
      };

      // Make the API request to submit the rating
      await useRating(ratingData);

      // Handle the successful rating submission
      console.log('Rating submitted successfully!');
    } catch (error) {
      console.log(error);
    }
  },[rating]);

  


 

  return (
    <div className="group" style={{ width: "300px", height: "400px" }}>
      <div
        className="bg-zinc-900 text-xl font-semibold col-span relative rounded-lg p-4 hover:shadow-lg transition duration-200"
        style={{ backgroundColor: "#414654", height: "100%", display: "flex", flexDirection: "column" }}
      >
        <p className="text-white">{data.title}</p>
        <img
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full"
          style={{ flex: "1", height: "300px" ,maxWidth: "200px",alignItems: "center", justifyContent: "center" , alignSelf: "center" }}
          src={`https://image.tmdb.org/t/p/w500/${movieData}`}
          alt=""
        />
        <div className="expand-icon" onClick={openModal}>
          <CgDetailsMore size={30} style={{color:"white"}} />
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
            width: "650px",
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
          {/* add the rating here */}
          <p>Rate the Movie:</p>
          <div>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                onClick={() => handleRatingChange(value)}
                style={{
                  cursor: "pointer",
                  color: rating >= value ? "gold" : "gray",
                  fontSize: "24px",
                }}
              >
                ★
              </span>
            ))}
            <p>Your Rating: {rating}</p>
          </div>

          <br />
          <button onClick={closeModal}>Close</button>
          <button onClick={handleRatingSubmit}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default MovieCard;