import { FormEvent, useState } from "react";
import useNotes from "@/hooks/use-notes";
import { Text, TextField, Button, Flex } from "@radix-ui/themes";
import { useModalStore } from "@/store/modal";
import { CheckboxProps, ChecklistProps, INIT_CHECKBOX_INPUT, Note as NoteProps } from "@/const";

import styles from "./form.module.css";
import { BtnCloseX } from "../btnCloseX";

const INPUT_TITLE = "title";
const INPUT_NOTE = "note";
const COLOR_ON_ERROR = "#ff3800";
const INPUT_STYLE_ON_ERROR = { border: `1px solid ${COLOR_ON_ERROR}` };
const INPUT_TYPES = { simpleNotes: "simpleNotes", checklist: "checklist" };

function getRandomId() {
  return window.crypto.randomUUID();
}

function CheckboxWrapper({
  value,
  children,
  errorChecklist,
}: {
  value: string;
  children: React.ReactNode;
  errorChecklist: boolean;
}) {
  return (
    <Flex gap="2">
      <TextField.Input
        type="text"
        placeholder="Add label"
        name={INPUT_TYPES.checklist}
        radius="large"
        size="2"
        defaultValue={value}
        style={errorChecklist ? INPUT_STYLE_ON_ERROR : undefined}
      />
      {children}
    </Flex>
  );
}

export default function FormEditChecklistNote({
  note,
  children,
  checkboxList: checkboxListFromParent,
}: {
  note: NoteProps | ChecklistProps;
  children: JSX.Element;
  checkboxList: CheckboxProps[];
}) {
  const { closeModal } = useModalStore();
  const [checkboxList, setcheckboxList] = useState([...checkboxListFromParent]);
  const [errorInputs, setErrorInputs] = useState({ [INPUT_TITLE]: false, [INPUT_NOTE]: false, checklist: false });
  const { handleEditChecklist } = useNotes();
  const valueTitle = note?.title ?? "";

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const id = note.id;
    const title = formData.get(INPUT_TITLE) as string;
    const titleError = title === "";
    const isInputEmpty = [titleError].find((element) => element);
    const checklist = formData.getAll(INPUT_TYPES.checklist) as string[];
    const isChecklistEmpty = checklist.some((element) => element === "");

    if (isInputEmpty || isChecklistEmpty) {
      setErrorInputs({ [INPUT_TITLE]: titleError, [INPUT_NOTE]: false, checklist: isChecklistEmpty });
      return;
    }

    setErrorInputs({ [INPUT_TITLE]: false, [INPUT_NOTE]: false, checklist: false });

    const newChecklist = checkboxList.map((input, index) => {
      return { ...input, value: checklist[index] };
    });

    const newNote = {
      id,
      type: INPUT_TYPES.checklist as "checklist",
      title,
      checklist: newChecklist,
      dateCreated: "",
      dateDeleted: "",
      dateEdited: "",
      pinned: false,
    };

    handleEditChecklist(newNote);
    closeModal("isEditChecklistModalOpen");
  };

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

  return (
    <div className={styles.box}>
      <Text as="span" size="5" weight="bold">
        Edit Checklist
      </Text>
      {children}
      <form className={styles.form} onSubmit={handleOnSubmit}>
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
              size="3"
            />
          </label>
        </div>
        <div className={styles["box-textarea"]}>
          <Button type="button" variant="soft" color="cyan" size="1" onClick={handleAddInput} mb="3">
            Add new checkbox
          </Button>
          <div className={styles["box-checklist"]}>
            {checkboxList.map((item) => {
              return (
                <CheckboxWrapper key={item.id} value={item.value} errorChecklist={errorInputs.checklist}>
                  <BtnCloseX onClick={() => handleRemoveInput(item.id)} />
                </CheckboxWrapper>
              );
            })}
          </div>
        </div>
        <Button size="3" my="2">
          Edit this checklist
        </Button>
      </form>
    </div>
  );
}
