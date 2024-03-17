import { useState } from "react";
import { Card, Text } from "@radix-ui/themes";
import styles from "./note.module.css";

function NotesOptions({ children }: { children: JSX.Element[] }) {
  return <div className={styles.options}>{children}</div>;
}

export default function Note({
  title,
  note,
  onClickRemoveNote,
  onClickEditNote,
}: {
  title: string;
  note: string;
  onClickRemoveNote: () => void;
  onClickEditNote: () => void;
}) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleOnClickOpenOptions = () => {
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
        <button className={styles.dots} onClick={handleOnClickOpenOptions} data-testid="button-dots-note">
          <span className={styles["span-dots"]}></span>
        </button>
      </Card>
      {isOptionsVisible && (
        <NotesOptions>
          <button onClick={onClickEditNote}>Edit note</button>
          <button onClick={onClickRemoveNote}>Remove</button>
        </NotesOptions>
      )}
    </div>
  );
}
