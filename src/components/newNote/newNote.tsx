"use client";

import { FormEvent } from "react";
import useNotes from "@/hooks/use-notes";
import { useModalStore } from "@/store/modal";
import { Text, Button } from "@radix-ui/themes";
import { Form } from "../form";
import styles from "./newNote.module.css";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";

export default function NewNote() {
  const { isModalOpen, openModal, closeModal } = useModalStore();
  const { handleAddNote } = useNotes();

  const handleOnClickOpenModal = () => {
    openModal();
  };
  const handleOnClickCloseModal = () => {
    closeModal();
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
    closeModal();
  };

  return (
    <div>
      <Button size="3" onClick={handleOnClickOpenModal}>
        Add new note
      </Button>

      {isModalOpen && (
        <div className={styles.modal}>
          <Form onSubmit={handleOnSubmit}>
            <Button
              size="3"
              variant="soft"
              color="ruby"
              style={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleOnClickCloseModal}
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
