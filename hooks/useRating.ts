import axios, { AxiosError } from 'axios';

interface RatingData {
  user_id: string;
  movie_id: string;
  rating: number;
}

const submitRating = async (ratingData: RatingData) => {
  try {
    const response = await axios.post('/api/ratings', ratingData);
    return response.data; // Optional: Return data from the response if needed
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log('Axios Error:', axiosError);
    }
    throw new Error('Failed to submit rating');
  }
};

export default submitRating;