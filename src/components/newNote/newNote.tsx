"use client";

import { FormEvent, useState } from "react";
import useNotes from "@/hooks/use-notes";
import { useModalStore } from "@/store/modal";
import { PortalModal, WrapperModal } from "../modal";
import { Form } from "../form";
import { Text, Button } from "@radix-ui/themes";
import { CheckboxProps, INIT_CHECKBOX_INPUT } from "@/const";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";
const INPUT_TYPES = { simpleNotes: "simpleNotes", checklist: "checklist" };

function getRandomId() {
  return window.crypto.randomUUID();
}

export default function NewNote() {
  const [errorInputs, setErrorInputs] = useState({ [INPUT_TITLE]: false, [INPUT_NOTE]: false, checklist: false });
  const { isNewNoteModalOpen, openModal, closeModal } = useModalStore();
  const [currentInputTypeTabs, setCurrentInputTypeTabs] = useState(INPUT_TYPES.simpleNotes);
  const { handleAddNote, handleAddChecklist } = useNotes();

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

    if (currentInputTypeTabs === INPUT_TYPES.checklist) {
      const id = getRandomId();
      const title = formData.get(INPUT_TITLE) as string;
      const titleError = title === "";
      const isInputEmpty = [titleError].find((element) => element);
      const checklist = formData.getAll(INPUT_TYPES.checklist) as string[];
      const isChecklistEmpty = checklist.some((element) => element === "");

      if (isInputEmpty || isChecklistEmpty) {
        setErrorInputs({ [INPUT_TITLE]: titleError, [INPUT_NOTE]: false, checklist: isChecklistEmpty });
        return;
      }

      setErrorInputs({ [INPUT_TITLE]: false, [INPUT_NOTE]: false, checklist: false });

      const newChecklist: CheckboxProps[] = checklist.map((element) => {
        return { ...INIT_CHECKBOX_INPUT, id: getRandomId(), value: element };
      });

      const newNote = {
        id,
        type: INPUT_TYPES.checklist as "checklist",
        title,
        checklist: newChecklist,
        dateCreated: "",
        dateDeleted: "",
        dateEdited: "",
        pinned: false,
      };

      handleAddChecklist(newNote);
      form.reset();
      closeModal("isNewNoteModalOpen");
      return;
    }

    const title = formData.get(INPUT_TITLE) as string;
    const note = formData.get(INPUT_NOTE) as string;
    const titleError = title === "";
    const noteError = note === "";
    const isInputEmpty = [titleError, noteError].find((element) => element);

    if (isInputEmpty) {
      setErrorInputs({ [INPUT_TITLE]: titleError, [INPUT_NOTE]: noteError, checklist: false });
      return;
    }

    setErrorInputs({ [INPUT_TITLE]: false, [INPUT_NOTE]: false, checklist: false });
    const id = getRandomId();

    const newNote = {
      id,
      type: INPUT_TYPES.simpleNotes as "simpleNotes",
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
      <Button style={{ whiteSpace: "nowrap" }} size="3" onClick={handleOnClickOpenModal}>
        Add new note
      </Button>

      <PortalModal selector="modal-portal" show={isNewNoteModalOpen}>
        <WrapperModal>
          <Form
            errorInputs={errorInputs}
            currentInputTypeTabs={currentInputTypeTabs}
            setCurrentInputTypeTabs={setCurrentInputTypeTabs}
            onSubmit={handleOnSubmit}
          >
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
    </div>
  );
}
