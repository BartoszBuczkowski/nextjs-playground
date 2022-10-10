import { useContext } from "react";
import { ReviewsStateContext } from "../contexts/ReviewsProvider";
import { Review } from "../contexts/ReviewsProvider.types";

export const useReviews = (movieId: number) => {
  const { reviews, addMovieReview } = useContext(ReviewsStateContext);

  return {
    reviews: reviews?.[movieId] || [],
    addMovieReview: (newReview: Review) => addMovieReview(newReview, movieId),
  };
};
