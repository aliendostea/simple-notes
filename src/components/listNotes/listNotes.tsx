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
import { Checklist } from "../checklist";
import { CheckboxProps, ChecklistProps, INIT_NOTE, Note as NoteProps } from "@/const";

import styles from "./listNotes.module.css";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";
const INPUT_TYPES = { simpleNotes: "simpleNotes", checklist: "checklist" };
const arrayNoteSkeleton = Array.from(Array(8).keys());

/*
function LikesApp() {
  const [likes, setLikes] = useState(0);
  async function addLikeToDB() {
    try {
      const response = await fetch("http://localhost:1234/api/likes/v1/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like: 1, app: "simple-notes" }),
      });

      const res = await response.json();

      if (!response.ok) {
        console.log("res", response.status);
        throw new Error("Error en petición");
      }

      return res;
    } catch (error) {
      console.log("Error occurred", error);
      throw new Error("Error en petición");
    }
  }

  const handleOnClickLikes = () => {
    addLikeToDB();
    setLikes((prevState) => prevState + 1);
  };

  useEffect(() => {
    async function getLikesFromDB() {
      try {
        const response = await fetch("http://localhost:1234/api/likes/v1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await response.json();
        setLikes(res.response.likes);

        if (!response.ok) {
          console.log("res", response.status);
          throw new Error("Error en petición");
        }
      } catch (error) {
        console.log("Error occurred", error);
        throw new Error("Error en petición");
      }
    }

    getLikesFromDB();
  }, []);
  return (
    <div>
      <h1>Likes App {likes}</h1>
      <button onClick={handleOnClickLikes}>Like</button>
    </div>
  );
}
*/
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
  const [noteToEdit, setNoteToEdit] = useState(INIT_NOTE);
  const { notes, isLoading, getNotesFromStore, removeNoteFromStore } = useNotes();

  const handleOnClickRemoveNote = (note: NoteProps | ChecklistProps) => {
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
  /*
  const notesFiltered = notes.filter((note: NoteProps) => {
    return (
      note.title.toLowerCase().search(inputSearch.toLowerCase()) !== -1 ||
      note.note.toLowerCase().search(inputSearch.toLowerCase()) !== -1
    );
  });
  */
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

      <div className={styles.grid}>
        {!isLoading &&
          notesFiltered?.map((note: any) => {
            // const newNote = note.type === INPUT_TYPES.checklist ? (note as NoteProps) : (note as ChecklistProps);
            if (note?.type && note?.type === "checklist" && note.type === INPUT_TYPES.checklist) {
              const newNote = note as ChecklistProps;
              return (
                <Checklist
                  key={newNote.id}
                  id={newNote.id}
                  data={newNote as ChecklistProps}
                  title={newNote.title}
                  checklist={newNote.checklist as CheckboxProps[]}
                  onClickRemoveNote={() => handleOnClickRemoveNote(newNote)}
                  // onClickEditNote={() => handleOnClickEditNote(newNote as NoteProps)}
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
