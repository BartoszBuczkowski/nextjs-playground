import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useReviews } from "../../hooks/useReviews";
import Button from "../Button/Button";
import css from "./ReviewsForm.module.css";

interface ReviewValues {
  nickname: string;
  review: string;
}

function ReviewsForm() {
  const { query } = useRouter();
  const { addMovieReview } = useReviews(Number(query.id));
  const { handleSubmit, register } = useForm<ReviewValues>();

  const onSubmit = ({ nickname, review }: ReviewValues) => {
    return addMovieReview({ author: nickname, reviewMessage: review });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={css.label}>
        Nickname:
        <input className={css.input} {...register("nickname")} />
      </label>
      <label className={css.label}>
        Review:
        <textarea className={css.input} {...register("review")} rows={4} />
      </label>
      <Button type="submit">Dodaj recenzję</Button>
    </form>
  );
}

export default ReviewsForm;
