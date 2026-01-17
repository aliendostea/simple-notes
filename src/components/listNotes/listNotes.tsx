"use client";

import { FormEvent, useEffect, useState } from "react";
import useNotes from "@/hooks/use-notes";
import { useModalStore } from "@/store/modal";
import { SearchBar } from "../searchBar";
import { Note, NoteSkeleton } from "../note";
import { PortalModal, WrapperModal } from "../modal";
import { FormEditChecklistNote, FormEditNote } from "../form";
import { IconEmptyNotes } from "../icons";
import { Text, Button } from "@radix-ui/themes";
import { Checklist } from "../checklist";
import { CheckboxProps, ChecklistProps, INIT_NOTE, Note as NoteProps } from "@/const";
import { IconNotesPlus } from "../icons/icons";

import styles from "./listNotes.module.css";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";
const INPUT_TYPES = { simpleNotes: "simpleNotes", checklist: "checklist" };
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
  const { notes, isLoading, getNotesFromStore, removeNoteFromStore } = useNotes();
  const { isEditNoteModalOpen, isEditChecklistModalOpen, closeModal, openModal } = useModalStore();
  const { handleEditNote } = useNotes();
  const [noteToEdit, setNoteToEdit] = useState<any>(INIT_NOTE);

  const handleOnClickRemoveNote = (note: NoteProps | ChecklistProps) => {
    removeNoteFromStore(note);
  };
  const handleOnClickEditNote = (note: NoteProps | ChecklistProps) => {
    openModal("isEditNoteModalOpen");
    setNoteToEdit(note);
  };
  const handleOnClickEditChecklist = (note: NoteProps | ChecklistProps) => {
    openModal("isEditChecklistModalOpen");
    setNoteToEdit(note);
  };
  const handleOnChange = (e: any) => {
    setInputSearch(e.target.value);
  };
  const handleResetInputSearch = () => {
    setInputSearch("");
  };
  const handleOnClickOpenModal = () => {
    openModal("isNewNoteModalOpen");
  };

  const notesFiltered = notes.filter((note: NoteProps | ChecklistProps) => {
    if (note.type === "simpleNotes") {
      return (
        note.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
        (note as NoteProps).note.toLowerCase().includes(inputSearch.toLowerCase())
      );
    } else if (note.type === "checklist") {
      return (
        note.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
        (note as ChecklistProps).checklist.some((item) => item.value.toLowerCase().includes(inputSearch.toLowerCase()))
      );
    }
    return [];
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
      type: INPUT_TYPES.simpleNotes as "simpleNotes",
      title,
      note,
      dateCreated: noteToEdit.dateCreated,
      dateDeleted: noteToEdit.dateDeleted,
      dateEdited: "",
      pinned: false,
    };
    handleEditNote(editedNote);

    form.reset();
    setNoteToEdit(INIT_NOTE);

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
    <div key="parent-list-notes" className={styles.parent}>
      <SearchBar value={inputSearch} onChange={handleOnChange} onClickReset={handleResetInputSearch} />

      <Button
        className={styles["btn-add-new-note"]}
        style={{ whiteSpace: "nowrap" }}
        size="3"
        onClick={handleOnClickOpenModal}
      >
        <IconNotesPlus />
        Add new note
      </Button>

      <div className={styles.grid}>
        {!isLoading && (
          <div>
            <span>test</span>
            {notes.map((element) => {
              return (
                <p key={element.id} style={{ color: "white" }}>
                  {JSON.stringify(element)}
                </p>
              );
            })}
          </div>
        )}
        {!isLoading &&
          notesFiltered?.map((note: any) => {
            // const newNote = note.type === INPUT_TYPES.checklist ? (note as NoteProps) : (note as ChecklistProps);
            if (note?.type && note.type === INPUT_TYPES.checklist) {
              const newNote = note as ChecklistProps;
              return (
                <Checklist
                  key={newNote.id}
                  id={newNote.id}
                  data={newNote as ChecklistProps}
                  title={newNote.title}
                  checklist={newNote.checklist as CheckboxProps[]}
                  onClickRemoveNote={() => handleOnClickRemoveNote(newNote)}
                  onClickEditNote={() => handleOnClickEditChecklist(newNote)}
                />
              );
            }
            return (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                note={note.note as string}
                onClickRemoveNote={() => handleOnClickRemoveNote(note as NoteProps)}
                onClickEditNote={() => handleOnClickEditNote(note as NoteProps)}
              />
            );
          })}
        {isLoading && notesFiltered.length === 0 && (
          <>
            {arrayNoteSkeleton.map((skeleton) => (
              <NoteSkeleton key={`NoteSkeleton${skeleton}`} />
            ))}
          </>
        )}

        {emptyArrayNotes && (
          <EmptyNotesContainer text="You don't have notes yet. Write your first note to get started!">
            <IconEmptyNotes />
          </EmptyNotesContainer>
        )}
        {emptyArrayNotesOnSearch && <EmptyNotesContainer text="We didn't find any note with that title or name" />}
      </div>

      <PortalModal key="edit-checklist" selector="modal-portal" show={isEditChecklistModalOpen}>
        <WrapperModal>
          <FormEditChecklistNote note={noteToEdit} checkboxList={noteToEdit?.checklist as CheckboxProps[]}>
            <Button
              size="3"
              variant="soft"
              color="ruby"
              style={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => closeModal("isEditChecklistModalOpen")}
            >
              <Text as="span" color="ruby" size="3">
                x
              </Text>
            </Button>
          </FormEditChecklistNote>
        </WrapperModal>
      </PortalModal>

      <PortalModal key="edit-note" selector="modal-portal" show={isEditNoteModalOpen}>
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
