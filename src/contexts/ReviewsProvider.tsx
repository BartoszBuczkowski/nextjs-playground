import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import type {
  AddMovieReview,
  ReviewContext,
  ReviewsProviderProps,
  ReviewsReducer,
} from "./ReviewsProvider.types";

export const ReviewsStateContext = createContext<ReviewContext>({
  reviews: {},
  addMovieReview: () => null,
});

const reducer: ReviewsReducer = (state, action) => {
  const { movieId, payload } = action;

  const oldReviewsList = state?.[movieId] || [];

  return {
    ...state,
    [movieId]: [...oldReviewsList, { ...payload, id: uuidv4() }],
  };
};

export const ReviewsProvider = ({ children }: ReviewsProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {});

  const addMovieReview: AddMovieReview = (newReview, movieId) => {
    dispatch({ movieId, payload: newReview });
  };

  return (
    <ReviewsStateContext.Provider value={{ reviews: state, addMovieReview }}>
      {children}
    </ReviewsStateContext.Provider>
  );
};
