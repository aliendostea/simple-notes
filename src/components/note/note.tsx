import { useEffect, useState } from "react";
import { Card, Text } from "@radix-ui/themes";
import styles from "./note.module.css";

function NotesOptions({
  children,
  setIsOptionsVisible,
}: {
  children: JSX.Element[];
  setIsOptionsVisible: (bool: boolean) => void;
}) {
  useEffect(() => {
    const onPageClick = (e: any) => {
      document.getElementById("note-options-popup");
      if (e.target.id !== "note-options-popup") {
        setIsOptionsVisible(false);
      }
    };

    document.addEventListener("click", onPageClick);

    return () => {
      document.removeEventListener("click", onPageClick);
    };
  }, []);

  return (
    <div id="note-options-popup" className={styles.options}>
      {children}
    </div>
  );
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

  const handleOnClickEditNote = () => {
    onClickEditNote();
    setIsOptionsVisible(false);
  };

  const handleOnClickRemoveNote = () => {
    onClickRemoveNote();
    setIsOptionsVisible(false);
  };

  return (
    <div id="note-parent" className={styles["note-parent"]} data-testid="note-parent">
      <Card variant="surface" style={{ position: "relative" }} data-testid="note-element">
        <Text as="span" size="3" weight="bold">
          {title}
        </Text>
        <Text as="p" color="gray" size="2" style={{ whiteSpace: "pre-line" }}>
          {note}
        </Text>
        <button className={styles.dots} onClick={handleOnClickOpenOptions} data-testid="button-dots-note">
          <span className={styles["span-dots"]}></span>
        </button>
      </Card>
      {isOptionsVisible && (
        <NotesOptions setIsOptionsVisible={setIsOptionsVisible}>
          <button key="btn-edit-note" onClick={handleOnClickEditNote}>
            Edit note
          </button>
          <button key="btn-remove-note" onClick={handleOnClickRemoveNote}>
            Remove
          </button>
        </NotesOptions>
      )}
    </div>
  );
}
