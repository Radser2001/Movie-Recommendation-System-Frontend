import axios, { AxiosError } from 'axios';

interface GenreData {
  user_id: string;
  genre: string[];
}

const submitGenres = async (genreData: GenreData) => {
  try {
    const response = await axios.post('/api/genre', genreData);
    return response.data; // Optional: Return data from the response if needed
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log('Axios Error:', axiosError);
    }
    throw new Error('Failed to submit genres');
  }
};

export default submitGenres;