type NoteType = "simpleNotes" | "checklist" | "";

interface BaseNote {
  id: string;
  type: NoteType;
  title: string;
  dateCreated: string;
  dateDeleted: string;
  dateEdited: string;
  pinned: boolean;
}

export interface CheckboxProps {
  id: string;
  type: string;
  name: string;
  value: string;
  checked: boolean;
}

export interface Note extends BaseNote {
  note: string;
}

export interface ChecklistProps extends BaseNote {
  checklist: CheckboxProps[];
}

export const INIT_NOTE: Note = {
  id: "",
  type: "",
  title: "",
  note: "",
  dateCreated: "",
  dateDeleted: "",
  dateEdited: "",
  pinned: false,
};
export const INIT_CHECKLIST_NOTE: ChecklistProps = {
  id: "",
  type: "",
  title: "",
  checklist: [],
  dateCreated: "",
  dateDeleted: "",
  dateEdited: "",
  pinned: false,
};

export const INIT_CHECKBOX_INPUT: CheckboxProps = {
  id: "",
  type: "checklist",
  name: "checklist",
  value: "",
  checked: false,
};
