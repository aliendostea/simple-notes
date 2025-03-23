"use client";

import { useEffect, useState } from "react";
import styles from "./likesCard.module.css";

const LOCAL_STORAGE_LIKES = "likes";
const API_LIKES = "http://localhost:1234/api/likes/v1/add";

const initLikeLocalStorage = {
  id: "11",
  app: "simple-notes",
  isLiked: false,
  createdAt: "",
  updatedAt: "",
};

function getLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) ?? "{}");
}
function setLocalStorage(key: string, item: any) {
  localStorage.setItem(key, JSON.stringify(item));
}
function localStorageAddLikes(like: any) {
  setLocalStorage(LOCAL_STORAGE_LIKES, {});
  setLocalStorage(LOCAL_STORAGE_LIKES, like);
}
function localStorageGetLikes() {
  const likesLocalStorage = getLocalStorage(LOCAL_STORAGE_LIKES);
  return likesLocalStorage;
}

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likesCount, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const likesLocalStorage = localStorageGetLikes();

  useEffect(() => {
    if (Object.keys(likesLocalStorage)?.length > 0 && likesLocalStorage?.isLiked) {
      setIsLiked(true);
    }
  }, []);

  const addLikeToDB = async () => {
    try {
      const response = await fetch(API_LIKES, {
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
  };

  const handleOnClickLikes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentDate = new Date().toISOString();
    const likesLocalStorage = localStorageGetLikes();

    if (e.target.checked) {
      setIsLiked(true);
      setLikes((prevState) => prevState + 1);
      localStorageAddLikes({
        ...initLikeLocalStorage,
        isLiked: true,
        createdAt: currentDate,
        updatedAt: currentDate,
      });

      if (Object.keys(likesLocalStorage)?.length > 0 && likesLocalStorage) {
        const localStorageDate = likesLocalStorage.updatedAt.substring(0, 10);
        const givenDate = new Date(localStorageDate);
        const now = new Date();
        const givenDateMidnight: any = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate());
        const nowMidnight: any = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const diffTime = nowMidnight - givenDateMidnight;
        const diffDays = (diffTime / (1000 * 60 * 60 * 24)) * -1;

        if (diffDays >= 1) {
          addLikeToDB();
        }
      } else {
        addLikeToDB();
      }
      return;
    }

    setIsLiked(false);
    setLikes((prevState) => prevState - 1);

    if (Object.keys(likesLocalStorage)?.length && likesLocalStorage) {
      localStorageAddLikes({ ...likesLocalStorage, isLiked: false, updatedAt: currentDate });
    }
  };

  return (
    <>
      {isLiked && <h3 className={styles.title}>Thanks for your like!</h3>}
      {isLiked === false && <h3 className={styles.title}>Are you liking SimpleNotes app?</h3>}
      <div className={styles.box}>
        <button className={styles.btn}>
          <input id="toggle-heart" type="checkbox" onChange={handleOnClickLikes} checked={isLiked} />
          <label htmlFor="toggle-heart">❤</label>
        </button>
        <span className={`${styles.count} ${isLiked ? styles["count--active"] : ""}`}>
          {likesCount > 10 ? `${likesCount} likes` : ""}
        </span>
      </div>
    </>
  );
}
