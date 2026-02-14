import { ListNotes } from "@/components/listNotes";
import { Providers } from "./providers";
import { ParentHeader } from "@/components/parentHeader";
import { ToastContainer } from "@/components/toast";
import styles from "./page.module.css";
import "@radix-ui/themes/styles.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Providers>
        <ParentHeader />

        <div className={styles.center}>
          <ListNotes />
        </div>
        <div id="modal-portal" />
      </Providers>
      <ToastContainer />
    </main>
  );
}
