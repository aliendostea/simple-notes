"use client";

import { useState, FormEvent } from "react";
import useNotes from "@/hooks/use-notes";
import { Text, Button } from "@radix-ui/themes";
import { Form } from "../form";
import styles from "./newNote.module.css";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";

export default function NewNote() {
  const [isModalActive, setIsModalActive] = useState(false);
  const { handleAddNote } = useNotes();

  const handleOnClick = () => {
    setIsModalActive((prevState) => !prevState);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get(INPUT_TITLE) as string;
    const note = formData.get(INPUT_NOTE) as string;
    if (title === "") {
      return;
    }
    const id = window.crypto.randomUUID();

    const newNote = {
      id,
      title,
      note,
      dateCreated: "",
      dateDeleted: "",
      dateEdited: "",
      pinned: false,
    };
    handleAddNote(newNote);
    form.reset();
    setIsModalActive(false);
  };

  return (
    <div>
      <Button size="3" onClick={handleOnClick}>
        Add new note
      </Button>

      {isModalActive && (
        <div className={styles.modal}>
          <Form onSubmit={handleOnSubmit}>
            <Button
              size="3"
              variant="soft"
              color="ruby"
              style={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleOnClick}
            >
              <Text as="span" color="ruby" size="3">
                x
              </Text>
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
