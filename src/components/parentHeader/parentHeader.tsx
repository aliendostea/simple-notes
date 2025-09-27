"use client";

import useNotes from "@/hooks/use-notes";
import { Header } from "../header";
import styles from "./parentHeader.module.css";

const ParentHeader = () => {
  const { notes } = useNotes();
  const showWelcome = notes.length > 0;
  const letters = showWelcome ? "welcome back!" : "you can add all your notes and to-do lists!";

  return (
    <div className={styles.parent}>
      <Header />
      <h1 className={`${styles.title} ${showWelcome ? styles["title-margin-bottom"] : ""}`}>Hey, {letters} </h1>
      {showWelcome === false && (
        <p className={styles.paragraph}>
          SimpleNotes is a small app for adding notes/text and to-do lists. No ads, for free, no bullshit. Enjoy!
        </p>
      )}
    </div>
  );
};

export default ParentHeader;
