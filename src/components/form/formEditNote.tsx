import { FormEvent } from "react";
import { Text, TextField, TextArea, Button } from "@radix-ui/themes";
import styles from "./form.module.css";

interface NoteProps {
  id: string;
  title: string;
  note: string;
  dateCreated: string;
  dateDeleted: string;
  dateEdited: string;
  pinned: boolean;
}

export default function FormEditNote({
  note,
  children,
  onSubmit,
}: {
  note: NoteProps;
  children: JSX.Element;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const valueTitle = note?.title ?? "";
  const valueNote = note?.note ?? "";
  return (
    <div className={styles.box}>
      <Text as="span" size="5" weight="bold">
        Edit note
      </Text>
      {children}
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label htmlFor="edit-title">
            <Text as="span" size="3" weight="bold">
              Edit title
            </Text>
            <TextField.Input
              id="edit-title"
              type="text"
              defaultValue={valueTitle}
              placeholder="Edit note title"
              name="title"
              radius="large"
            />
          </label>
        </div>
        <div>
          <label htmlFor="edit-note">
            <Text as="span" size="3" weight="bold">
              Edit note
            </Text>
            <TextArea
              variant="classic"
              id="edit-note"
              defaultValue={valueNote}
              placeholder="Edit note"
              name="note"
              size="3"
            />
          </label>
        </div>
        <Button size="3">Edit this note</Button>
      </form>
    </div>
  );
}
