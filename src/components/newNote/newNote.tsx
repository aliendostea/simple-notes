"use client";

import { useState, FormEvent } from "react";
import useNotes from "@/hooks/use-notes";
import { Text, TextField, TextArea, Button } from "@radix-ui/themes";
import styles from "./newNote.module.css";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";

function Form({ children, onSubmit }: { children: JSX.Element; onSubmit: (e: FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className={styles.box}>
      <Text as="span" size="5" weight="bold">
        Add new note
      </Text>
      {children}
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label htmlFor="new-title">
            <Text as="span" size="3" weight="bold">
              Title
            </Text>
            <TextField.Input id="new-title" type="text" placeholder="Title" name="title" radius="large" />
          </label>
        </div>
        <div>
          <label htmlFor="new-note">
            <Text as="span" size="3" weight="bold">
              Note
            </Text>
            <TextArea variant="classic" id="new-note" placeholder="Note" name="note" size="3" />
          </label>
        </div>
        <Button size="3">Add note</Button>
      </form>
    </div>
  );
}

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
    const splited = id.split("-");

    const newNote = {
      id,
      title: `${title} ${splited[4]}`,
      note: `${note} ${id}`,
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
