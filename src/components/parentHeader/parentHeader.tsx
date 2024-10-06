"use client";

import useNotes from "@/hooks/use-notes";
import { Header } from "../header";
import styles from "./parentHeader.module.css";

const ParentHeader = () => {
  const { notes } = useNotes();
  const letters = notes.length > 0 ? "welcome back!" : "you can add all your notes here!";

  return (
    <div className={styles.parent}>
      <Header />
      <h1 className="text-3xl font-bold underline" style={{ color: "#424242" }}>
        Hey, {letters}{" "}
      </h1>
    </div>
  );
};

export default ParentHeader;
