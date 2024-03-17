import styles from "./modal.module.css";

export default function WrapperModal({ children }: { children: JSX.Element }) {
  return <div className={styles.wrapper}>{children}</div>;
}
