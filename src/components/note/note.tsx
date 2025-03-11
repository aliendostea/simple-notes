import { useCallback, useEffect, useState } from "react";
import { Card, Text } from "@radix-ui/themes";
import styles from "./note.module.css";

interface NotesOptionsProps {
  children: React.ReactNode;
  setIsOptionsVisible: (visible: boolean) => void;
}

function NotesOptions({ children, setIsOptionsVisible }: NotesOptionsProps) {
  useEffect(() => {
    const onPageClick = (e: MouseEvent) => {
      document.getElementById("note-options-popup");
      if ((e.target as HTMLElement).id !== "note-options-popup") {
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
  id,
  note,
  onClickRemoveNote,
  onClickEditNote,
}: {
  title: string;
  id: string;
  note: string;
  onClickRemoveNote: () => void;
  onClickEditNote: () => void;
}) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleToggleOptions = useCallback(() => {
    setIsOptionsVisible((prevState) => !prevState);
  }, []);

  const handleEditNote = useCallback(() => {
    onClickEditNote();
    setIsOptionsVisible(false);
  }, [onClickEditNote]);

  const handleRemoveNote = useCallback(() => {
    onClickRemoveNote();
    setIsOptionsVisible(false);
  }, [onClickRemoveNote]);

  return (
    <div id={`note-parent-${id}`} className={styles["note-parent"]} data-testid="note-parent">
      <Card variant="surface" style={{ position: "relative" }} data-testid="note-element">
        <Text as="span" size="3" weight="bold">
          {title}
        </Text>
        <Text as="p" color="gray" size="2" style={{ whiteSpace: "pre-line" }}>
          {note}
        </Text>
        <button
          className={styles.dots}
          onClick={handleToggleOptions}
          data-testid="button-dots-note"
          aria-label="Options"
        >
          <span className={styles["span-dots"]}></span>
        </button>
      </Card>
      {isOptionsVisible && (
        <NotesOptions setIsOptionsVisible={setIsOptionsVisible}>
          <button key="btn-edit-note" onClick={handleEditNote}>
            Edit note
          </button>
          <button key="btn-remove-note" onClick={handleRemoveNote}>
            Remove
          </button>
        </NotesOptions>
      )}
    </div>
  );
}
