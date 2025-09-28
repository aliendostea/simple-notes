import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        ©Copyright 2025. Created with love{" "}
        <span className={styles.heart}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
          </svg>
        </span>{" "}
        by{" "}
        <a href="https://github.com/aliendostea" target="_blank">
          Ang.dev
        </a>{" "}
        <span className={styles.code}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="rgb(112, 184, 255)"
          >
            <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
          </svg>
        </span>
        All rights reversed.
      </p>
    </footer>
  );
}
