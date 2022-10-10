import { useRouter } from "next/router";
import { useReviews } from "../../hooks/useReviews";
import css from "./ReviewsList.module.css";

function ReviewsList() {
  const { query } = useRouter();
  const { reviews } = useReviews(Number(query?.id));

  return (
    <ul className={css["comments-list"]}>
      {reviews.map(({ author, reviewMessage, id }) => (
        <li key={id} className={css["comment-wrapper"]}>
          <h4>{author}</h4>
          <p>{reviewMessage}</p>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;
