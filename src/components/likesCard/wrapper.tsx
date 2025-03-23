"use client";

import { useEffect, useState } from "react";
import LikeButton from "./likeButton";

import styles from "./likesCard.module.css";

const LOCAL_STORAGE_LIKES = "likes";

function getLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) ?? "{}");
}
function localStorageGetLikes() {
  const likesLocalStorage = getLocalStorage(LOCAL_STORAGE_LIKES);
  return likesLocalStorage;
}
const promiseAwaitActive = async (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export default function Wrapper({ initialLikes }: { initialLikes: number }) {
  const [isActive, setIsActive] = useState(false);

  const handleClickClose = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const likesLocalStorage = localStorageGetLikes();

    const setAwaitActive = async () => {
      await promiseAwaitActive(7000);
      setIsActive(true);
    };

    if (Object.keys(likesLocalStorage)?.length > 0 && likesLocalStorage) {
      const localStorageDate = likesLocalStorage.updatedAt.substring(0, 10);
      const givenDate = new Date(localStorageDate);
      const now = new Date();
      const givenDateMidnight: any = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate());
      const nowMidnight: any = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const diffTime = nowMidnight - givenDateMidnight;
      const diffDays = (diffTime / (1000 * 60 * 60 * 24)) * -1;
      const isBigger = diffDays >= 1;

      if (isBigger) {
        setAwaitActive();
      }
    } else {
      setAwaitActive();
    }
  }, []);

  return (
    <>
      {isActive && (
        <div className={styles.card}>
          <button className={styles["btn-x"]} onClick={handleClickClose}>
            X
          </button>
          <LikeButton initialLikes={initialLikes} />
        </div>
      )}
    </>
  );
}
