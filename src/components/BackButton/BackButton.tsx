import { useRouter } from "next/router";
import Button from "../Button/Button";
import css from "./BackButton.module.css";

function BackButton() {
  const router = useRouter();
  const isMainPage = router.pathname === "/";

  if (isMainPage) return <></>;

  return (
    <div className={css["back-button"]}>
      <Button onClick={router.back}>⟵ Powrót</Button>
    </div>
  );
}

export default BackButton;
