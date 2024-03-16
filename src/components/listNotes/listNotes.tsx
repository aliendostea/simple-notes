"use client";

import { useEffect, useState } from "react";
import useNotes from "@/hooks/use-notes";
import { SearchBar } from "../searchBar";
import { Note, NoteSkeleton } from "../note";
import styles from "./listNotes.module.css";
import { IconEmptyNotes } from "../icons";

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
  const { notes, isLoading, getNotesFromStore, removeNoteFromStore } = useNotes();

  const handleOnClick = (note: NoteProps) => {
    removeNoteFromStore(note);
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

  useEffect(() => {
    const getData = async () => {
      await getNotesFromStore();
    };
    getData();
  }, []);

  return (
    <div className={styles.parent}>
      <SearchBar value={inputSearch} onChange={handleOnChange} onClickReset={handleResetInputSearch} />

      <div className={styles.grid}>
        {!isLoading &&
          notesFiltered?.map((note: NoteProps) => (
            <Note key={note.id} title={note.title} note={note.note} onClick={() => handleOnClick(note)} />
          ))}
        {isLoading && notesFiltered.length === 0 && (
          <>
            {arrayNoteSkeleton.map((skeleton) => (
              <NoteSkeleton key={`NoteSkeleton${skeleton}`} />
            ))}
          </>
        )}

        {!isLoading && inputSearch.length === 0 && notesFiltered.length === 0 && (
          <EmptyNotesContainer text="You don't have notes yet. Write your first note started">
            <IconEmptyNotes />
          </EmptyNotesContainer>
        )}
        {!isLoading && inputSearch.length > 0 && notesFiltered.length === 0 && (
          <EmptyNotesContainer text="We didn't find any note with that title or name" />
        )}
      </div>
    </div>
  );
}
