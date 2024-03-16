"use client";

import { useEffect, useState } from "react";
import { Card, Text, Button } from "@radix-ui/themes";

import useNotes from "@/hooks/use-notes";
import { SearchBar } from "../searchBar";
import styles from "./listNotes.module.css";

interface Note {
  id: string;
  title: string;
  note: string;
  dateCreated: string;
  dateDeleted: string;
  dateEdited: string;
  pinned: boolean;
}

function EmptyNotes() {
  return (
    <svg
      fill="#262626"
      height="100px"
      width="100px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50"
      enable-background="new 0 0 50 50"
      // xml:space="preserve"
    >
      <path
        d="M36,40.301c0.552,0,1-0.447,1-1v-24.6c0-0.022-0.011-0.041-0.013-0.063c-0.006-0.09-0.023-0.177-0.053-0.262
	c-0.012-0.034-0.021-0.066-0.036-0.098c-0.045-0.096-0.103-0.186-0.179-0.265c-0.006-0.006-0.009-0.015-0.016-0.021
	c-0.001-0.001-0.002-0.003-0.003-0.005l-5.5-5.4c-0.083-0.081-0.18-0.14-0.282-0.188c-0.031-0.014-0.063-0.022-0.096-0.033
	c-0.085-0.029-0.172-0.047-0.262-0.053C30.54,8.312,30.522,8.301,30.5,8.301H14c-0.552,0-1,0.447-1,1v30c0,0.553,0.448,1,1,1H36z
	 M31.5,11.685l2.054,2.017H31.5V11.685z M15,10.301h14.5v4.4c0,0.553,0.448,1,1,1H35v22.6H15V10.301z"
      />
    </svg>
  );
}

function Note({ title, note, onClick }: { title: string; note: string; onClick: () => void }) {
  return (
    <Card variant="surface" style={{ position: "relative" }}>
      <Text as="div" size="3" weight="bold">
        {title}
      </Text>
      <Text as="div" color="gray" size="2">
        {note}
      </Text>
      <Button size="3" variant="soft" color="ruby" style={{ position: "absolute", top: 0, right: 0 }} onClick={onClick}>
        <Text as="span" color="ruby" size="3">
          x
        </Text>
      </Button>
    </Card>
  );
}

function NoteSkeleton() {
  return <div className={styles.skeleton}></div>;
}

export default function ListNotes() {
  const [inputSearch, setInputSearch] = useState("");
  const { notes, isLoading, getNotesFromStore, removeNoteFromStore } = useNotes();

  const handleOnClick = (note: Note) => {
    removeNoteFromStore(note);
  };
  const handleOnChange = (e: any) => {
    setInputSearch(e.target.value);
  };
  const handleResetInputSearch = () => {
    setInputSearch("");
  };
  const notesFiltered = notes.filter((note: Note) => {
    return note.title.toLowerCase().search(inputSearch.toLowerCase()) !== -1;
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
          notesFiltered?.map((note: Note) => (
            <Note key={note.id} title={note.title} note={note.note} onClick={() => handleOnClick(note)} />
          ))}
        {isLoading && notesFiltered.length === 0 && (
          <>
            <NoteSkeleton />
            <NoteSkeleton />
            <NoteSkeleton />
            <NoteSkeleton />
            <NoteSkeleton />
            <NoteSkeleton />
            <NoteSkeleton />
            <NoteSkeleton />
          </>
        )}

        {!isLoading && inputSearch.length === 0 && notesFiltered.length === 0 && (
          <div className={styles.empty}>
            <EmptyNotes />
            <span>You don&apos;t have notes yet. Write your first to get started</span>
          </div>
        )}
        {!isLoading && inputSearch.length > 0 && notesFiltered.length === 0 && (
          <div className={styles.empty}>
            <span>We didn&apos;t find any note with that title or name</span>
          </div>
        )}
      </div>
    </div>
  );
}
