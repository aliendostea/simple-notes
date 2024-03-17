"use client";

import { FormEvent } from "react";
import useNotes from "@/hooks/use-notes";
import { useModalStore } from "@/store/modal";
import { PortalModal, WrapperModal } from "../modal";
import { Form } from "../form";
import { Text, Button } from "@radix-ui/themes";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";

export default function NewNote() {
  const { isNewNoteModalOpen, openModal, closeModal } = useModalStore();
  const { handleAddNote } = useNotes();

  const handleOnClickOpenModal = () => {
    openModal("isNewNoteModalOpen");
  };
  const handleOnClickCloseModal = () => {
    closeModal("isNewNoteModalOpen");
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
    closeModal("isNewNoteModalOpen");
  };

  return (
    <div>
      <Button size="3" onClick={handleOnClickOpenModal}>
        Add new note
      </Button>

      <PortalModal selector="modal-portal" show={isNewNoteModalOpen}>
        <WrapperModal>
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
        </WrapperModal>
      </PortalModal>

      {/* {isModalOpen && (
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
      )} */}
    </div>
  );
}
