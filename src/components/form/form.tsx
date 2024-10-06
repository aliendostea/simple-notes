import { FormEvent } from "react";
import { Text, TextField, TextArea, Button } from "@radix-ui/themes";
import styles from "./form.module.css";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";
const COLOR_ON_ERROR = "#ff3800";
const TEXT_STYLE_ON_ERROR = { color: COLOR_ON_ERROR };
const INPUT_STYLE_ON_ERROR = { border: `1px solid ${COLOR_ON_ERROR}` };

function ErrorSpan({ title }: { title: string }) {
  return <span style={{ color: "#ff3800" }}> {title} </span>;
}

export default function Form({
  children,
  errorInputs,
  onSubmit,
}: {
  children: JSX.Element;
  errorInputs: any;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const errorTitle = errorInputs[INPUT_TITLE];
  const errorNote = errorInputs[INPUT_NOTE];

  return (
    <div className={styles.box}>
      <Text as="span" size="5" weight="bold">
        Add new note
      </Text>
      {children}
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label htmlFor="new-title">
            <Text as="span" size="3" weight="bold" style={errorTitle ? TEXT_STYLE_ON_ERROR : undefined}>
              Title
            </Text>
            <TextField.Input
              id="new-title"
              type="text"
              placeholder="Add note title"
              name="title"
              radius="large"
              size="3"
              style={errorTitle ? INPUT_STYLE_ON_ERROR : undefined}
            />
          </label>
          {errorTitle && <ErrorSpan title="Title it's empty" />}
        </div>
        <div className={styles["box-textarea"]}>
          <label htmlFor="new-note">
            <Text as="span" size="3" weight="bold" style={errorNote ? TEXT_STYLE_ON_ERROR : undefined}>
              Note
            </Text>
          </label>
          <TextArea
            variant="classic"
            id="new-note"
            placeholder="Add note"
            name="note"
            size="3"
            style={errorNote ? INPUT_STYLE_ON_ERROR : undefined}
          />
          {errorNote && <ErrorSpan title="Note it's empty" />}
        </div>
        <Button size="3" style={{ marginTop: errorNote && "16px" }}>
          Add note
        </Button>
      </form>
    </div>
  );
}
