import { useState } from "react";
import { Card, Text } from "@radix-ui/themes";
import styles from "./note.module.css";

function NotesOptions({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.options}>
      <span>Edit</span>
      <span onClick={onClick}>Remove</span>
    </div>
  );
}

export default function Note({
  title,
  note,
  onClickRemoveNote,
}: {
  title: string;
  note: string;
  onClickRemoveNote: () => void;
}) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleOnClick = () => {
    setIsOptionsVisible((prevState) => !prevState);
  };

  return (
    <div className={styles["note-parent"]}>
      <Card variant="surface" style={{ position: "relative" }} data-testid="note-element">
        <Text as="div" size="3" weight="bold">
          {title}
        </Text>
        <Text as="div" color="gray" size="2">
          {note}
        </Text>
        <button className={styles.dots} onClick={handleOnClick}>
          <span className={styles["span-dots"]}></span>
        </button>
      </Card>
      {isOptionsVisible && <NotesOptions onClick={onClickRemoveNote} />}
    </div>
  );
}
