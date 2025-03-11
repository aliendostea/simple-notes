import { FormEvent, useState } from "react";
import { Text, TextField, TextArea, Button, Flex, Box } from "@radix-ui/themes";
import { INIT_CHECKBOX_INPUT } from "@/const";

import styles from "./form.module.css";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";
const COLOR_ON_ERROR = "#ff3800";
const TEXT_STYLE_ON_ERROR = { color: COLOR_ON_ERROR };
const INPUT_STYLE_ON_ERROR = { border: `1px solid ${COLOR_ON_ERROR}` };

function ErrorSpan({ title }: { title: string }) {
  return <span style={{ color: "#ff3800" }}> {title} </span>;
}

function getRandomId() {
  return window.crypto.randomUUID();
}

const INPUT_TYPES = { simpleNotes: "simpleNotes", checklist: "checklist" };

function CheckboxWrapper({ children, errorChecklist }: { children: React.ReactNode; errorChecklist: boolean }) {
  return (
    <Flex gap="2">
      <TextField.Input
        type="text"
        placeholder="Add label"
        name={INPUT_TYPES.checklist}
        radius="large"
        size="2"
        style={errorChecklist ? INPUT_STYLE_ON_ERROR : undefined}
      />
      {children}
    </Flex>
  );
}

export default function Form({
  children,
  errorInputs,
  currentInputTypeTabs,
  onSubmit,
  setCurrentInputTypeTabs,
}: {
  children: JSX.Element;
  errorInputs: any;
  currentInputTypeTabs: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setCurrentInputTypeTabs: (type: string) => void;
}) {
  const [checkboxList, setcheckboxList] = useState([{ ...INIT_CHECKBOX_INPUT, id: getRandomId() }]);
  const errorTitle = errorInputs[INPUT_TITLE];
  const errorNote = errorInputs[INPUT_NOTE];
  const errorChecklist = errorInputs[INPUT_TYPES.checklist];

  const handleAddInput = () => {
    const id = getRandomId();
    setcheckboxList((prevState) => {
      return [...prevState, { ...INIT_CHECKBOX_INPUT, id: id }];
    });
  };

  const handleRemoveInput = (id: string) => {
    const founded = checkboxList.findIndex((element) => element.id === id);
    const copyWithoutFirstElement = checkboxList.toSpliced(founded, 1);
    setcheckboxList(copyWithoutFirstElement);
  };

  const handleClickTabs = (type: string) => {
    setCurrentInputTypeTabs(type);
  };

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
              mt="1"
              mb="3"
            />
          </label>
          {errorTitle && <ErrorSpan title="Title it's empty" />}
        </div>
        <div className={styles["box-tabs"]}>
          <button
            type="button"
            className={`${styles.btnTabs} ${currentInputTypeTabs === INPUT_TYPES.simpleNotes ? styles.active : ""}`}
            onClick={() => handleClickTabs(INPUT_TYPES.simpleNotes)}
          >
            Simple Notes
          </button>
          <button
            type="button"
            className={`${styles.btnTabs} ${currentInputTypeTabs === INPUT_TYPES.checklist ? styles.active : ""}`}
            onClick={() => handleClickTabs(INPUT_TYPES.checklist)}
          >
            Checklist
          </button>
        </div>

        <Box>
          {currentInputTypeTabs === INPUT_TYPES.simpleNotes && (
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
                mt="1"
              />
              {errorNote && <ErrorSpan title="Note it's empty" />}
            </div>
          )}

          {currentInputTypeTabs === INPUT_TYPES.checklist && (
            <div>
              <Button type="button" variant="soft" color="cyan" size="1" onClick={handleAddInput} my="1">
                Add new checkbox
              </Button>
              <div className={styles["box-checklist"]}>
                {checkboxList.map((item) => {
                  return (
                    <CheckboxWrapper key={item.id} errorChecklist={errorChecklist}>
                      <Button size="1" variant="soft" color="ruby" onClick={() => handleRemoveInput(item.id)}>
                        <Text as="span" color="ruby" size="3">
                          x
                        </Text>
                      </Button>
                    </CheckboxWrapper>
                  );
                })}
              </div>
            </div>
          )}
        </Box>

        <Button size="3" mt="3" style={{ width: "100%", marginTop: errorNote && "16px" }}>
          Add note
        </Button>
      </form>
    </div>
  );
}
