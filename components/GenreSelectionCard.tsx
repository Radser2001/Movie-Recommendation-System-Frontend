import React, { useState, useCallback } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import submitGenres from "@/hooks/useGenre";

interface GenreSelectionCardProps {
  favoriteGenres: string[];
  handleGenreChange: (genre: string) => void;
  onContinue: () => void;
  data: Record<string, any>;
}

const GenreSelectionCard: React.FC<GenreSelectionCardProps> = ({
  favoriteGenres,
  setFavoriteGenres,
  handleGenreChange,
  onContinue,
  data,
  login
}) => {
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ];

  const [genre, setGenre] = useState<string[]>([]);

  const { data: currentUser } = useCurrentUser();

  const [updatedList,setUpdatedList] = useState<string[]>([]);

  const handleGenreSubmit = useCallback(async () => {
    
    try {
      const genreData = {
        user_id: currentUser?.currentUser?.id,
        genre: updatedList
      };

      await submitGenres(genreData); // Call the submitGenres function
      
    } catch (error) {
      console.log(error);
    }
  }, [currentUser, genre]);

  const isGenreSelected = (genre: string) => {
    return favoriteGenres.includes(genre);
  };


  const toggleGenre = (selectedGenre: string) => {
    console.log(currentUser)
    setGenre((prevGenre) => {
      const updatedGenre = prevGenre.includes(selectedGenre)
        ? prevGenre.filter((genre) => genre !== selectedGenre)
        : [...prevGenre, selectedGenre];
  
      console.log(updatedGenre); // Log the updated genre array

      setFavoriteGenres(updatedGenre)
      
      return updatedGenre;
    });
  };

  

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
      <div className="bg-white p-6 rounded-md">
        <h3 className="text-2xl font-semibold mb-4">Select your favorite genres</h3>
        <div className="flex flex-wrap gap-4">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`py-2 px-4 rounded-md ${
                isGenreSelected(genre) ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <button
          onClick={onContinue}
          className="bg-red-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transition"
        >
          Continue
        </button>
        <button
          onClick={handleGenreSubmit}
          className="bg-red-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GenreSelectionCard;