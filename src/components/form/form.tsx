import { FormEvent } from "react";
import { Text, TextField, TextArea, Button } from "@radix-ui/themes";
import styles from "./form.module.css";

export default function Form({
  children,
  onSubmit,
}: {
  children: JSX.Element;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className={styles.box}>
      <Text as="span" size="5" weight="bold">
        Add new note
      </Text>
      {children}
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label htmlFor="new-title">
            <Text as="span" size="3" weight="bold">
              Title
            </Text>
            <TextField.Input id="new-title" type="text" placeholder="Add note title" name="title" radius="large" />
          </label>
        </div>
        <div>
          <label htmlFor="new-note">
            <Text as="span" size="3" weight="bold">
              Note
            </Text>
            <TextArea variant="classic" id="new-note" placeholder="Add note" name="note" size="3" />
          </label>
        </div>
        <Button size="3">Add note</Button>
      </form>
    </div>
  );
}
