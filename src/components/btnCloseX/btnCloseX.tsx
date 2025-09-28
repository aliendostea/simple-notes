import { IconX } from "../icons/icons";

import styles from "./btnCloseX.module.css";

export default function BtnCloseX({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles["btn-close-x"]} onClick={onClick}>
      <IconX />
    </button>
  );
}
