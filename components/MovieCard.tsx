import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import Modal from "react-modal";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="group">
      <div
        className="bg-zinc-900 text-xl font-semibold col-span relative h-[12vw] rounded-lg p-4 hover:shadow-lg transition duration-200"
        style={{ backgroundColor: "#414654" }}
      >
        <p className="text-white">{data.title}</p>
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

export default MovieCard;
