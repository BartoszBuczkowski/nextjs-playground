import { ReactNode } from "react";

export interface Review {
  author: string;
  reviewMessage: string;
}

export type AddMovieReview = (newReview: Review, movieId: number) => void;

export interface ReviewContext {
  reviews: ReviewsState;
  addMovieReview: AddMovieReview;
}

export interface ReviewsProviderProps {
  children: ReactNode;
}

export interface ReviewWithId extends Review {
  id: number;
}
export type ReviewsState = Record<number, ReviewWithId[]>;
export interface ReviewsAction {
  movieId: number;
  payload: Review;
}

export type ReviewsReducer = (
  state: ReviewsState,
  action: ReviewsAction
) => ReviewsState | {};
