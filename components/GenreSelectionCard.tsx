import React from "react";

interface GenreSelectionCardProps {
  favoriteGenres: string[];
  handleGenreChange: (genre: string) => void;
  handleContinue: () => void;
}

const GenreSelectionCard: React.FC<GenreSelectionCardProps> = ({
  favoriteGenres,
  handleGenreChange,
  handleContinue,
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

  const isGenreSelected = (genre: string) => {
    return favoriteGenres.includes(genre);
  };

  const toggleGenre = (genre: string) => {
    handleGenreChange(genre);
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
          onClick={handleContinue}
          className="bg-red-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default GenreSelectionCard;