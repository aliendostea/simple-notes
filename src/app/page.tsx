import { Header } from "@/components/header";
import { ListNotes } from "@/components/listNotes";
import { Providers } from "./providers";
import styles from "./page.module.css";
import "@radix-ui/themes/styles.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Providers>
        <div className={styles.description}>
          <Header />
          <h1 className="text-3xl font-bold underline">Hey, you can add all your notes here!</h1>
        </div>

        <div className={styles.center}>
          <ListNotes />
        </div>
        <div id="modal-portal" />
      </Providers>
    </main>
  );
}
