"use client";

import { FormEvent, useEffect, useState } from "react";
import useNotes from "@/hooks/use-notes";
import { useModalStore } from "@/store/modal";
import { SearchBar } from "../searchBar";
import { Note, NoteSkeleton } from "../note";
import { PortalModal, WrapperModal } from "../modal";
import { FormEditNote } from "../form";
import { IconEmptyNotes } from "../icons";
import { Text, Button } from "@radix-ui/themes";

import styles from "./listNotes.module.css";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";

interface NoteProps {
  id: string;
  title: string;
  note: string;
  dateCreated: string;
  dateDeleted: string;
  dateEdited: string;
  pinned: boolean;
}

const arrayNoteSkeleton = Array.from(Array(8).keys());

function EmptyNotesContainer({ text, children }: { text: string; children?: JSX.Element }) {
  return (
    <div className={styles.empty}>
      {children && children}
      <span>{text} </span>
    </div>
  );
}

export default function ListNotes() {
  const [inputSearch, setInputSearch] = useState("");
  const { isEditNoteModalOpen, closeModal, openModal } = useModalStore();
  const { handleEditNote } = useNotes();
  const [noteToEdit, setNoteToEdit] = useState({
    id: "",
    title: "",
    note: "",
    dateCreated: "",
    dateDeleted: "",
    dateEdited: "",
    pinned: false,
  });
  const { notes, isLoading, getNotesFromStore, removeNoteFromStore } = useNotes();

  const handleOnClickRemoveNote = (note: NoteProps) => {
    removeNoteFromStore(note);
  };
  const handleOnClickEditNote = (note: NoteProps) => {
    openModal("isEditNoteModalOpen");
    setNoteToEdit(note);
  };
  const handleOnChange = (e: any) => {
    setInputSearch(e.target.value);
  };
  const handleResetInputSearch = () => {
    setInputSearch("");
  };
  const notesFiltered = notes.filter((note: NoteProps) => {
    return (
      note.title.toLowerCase().search(inputSearch.toLowerCase()) !== -1 ||
      note.note.toLowerCase().search(inputSearch.toLowerCase()) !== -1
    );
  });

  const handleEditNoteOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get(INPUT_TITLE) as string;
    const note = formData.get(INPUT_NOTE) as string;
    if (title === "") {
      return;
    }

    const editedNote = {
      id: noteToEdit.id,
      title,
      note,
      dateCreated: noteToEdit.dateCreated,
      dateDeleted: noteToEdit.dateDeleted,
      dateEdited: "",
      pinned: false,
    };

    handleEditNote(editedNote);

    form.reset();
    setNoteToEdit({
      id: "",
      title: "",
      note: "",
      dateCreated: "",
      dateDeleted: "",
      dateEdited: "",
      pinned: false,
    });

    closeModal("isEditNoteModalOpen");
  };

  useEffect(() => {
    const getData = async () => {
      await getNotesFromStore();
    };
    getData();
  }, []);

  const emptyArrayNotes = !isLoading && inputSearch.length === 0 && notesFiltered.length === 0;
  const emptyArrayNotesOnSearch = !isLoading && inputSearch.length > 0 && notesFiltered.length === 0;

  return (
    <div className={styles.parent}>
      <SearchBar value={inputSearch} onChange={handleOnChange} onClickReset={handleResetInputSearch} />

      <div className={styles.grid}>
        {!isLoading &&
          notesFiltered?.map((note: NoteProps) => (
            <Note
              key={note.id}
              title={note.title}
              note={note.note}
              onClickRemoveNote={() => handleOnClickRemoveNote(note)}
              onClickEditNote={() => handleOnClickEditNote(note)}
            />
          ))}
        {isLoading && notesFiltered.length === 0 && (
          <>
            {arrayNoteSkeleton.map((skeleton) => (
              <NoteSkeleton key={`NoteSkeleton${skeleton}`} />
            ))}
          </>
        )}

        {emptyArrayNotes && (
          <EmptyNotesContainer text="You don't have notes yet. Write your first note started">
            <IconEmptyNotes />
          </EmptyNotesContainer>
        )}
        {emptyArrayNotesOnSearch && <EmptyNotesContainer text="We didn't find any note with that title or name" />}
      </div>

      <PortalModal selector="modal-portal" show={isEditNoteModalOpen}>
        <WrapperModal>
          <FormEditNote onSubmit={handleEditNoteOnSubmit} note={noteToEdit}>
            <Button
              size="3"
              variant="soft"
              color="ruby"
              style={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => closeModal("isEditNoteModalOpen")}
            >
              <Text as="span" color="ruby" size="3">
                x
              </Text>
            </Button>
          </FormEditNote>
        </WrapperModal>
      </PortalModal>
    </div>
  );
}
