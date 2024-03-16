import styles from "./note.module.css";

export default function NoteSkeleton() {
  return <div className={styles.skeleton} data-testid="note-skeleton-loader"></div>;
}
