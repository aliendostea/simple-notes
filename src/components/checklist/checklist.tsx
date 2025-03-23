import { useCallback, useEffect, useState } from "react";
import { Card, Text, Flex, Checkbox } from "@radix-ui/themes";
import useNotes from "@/hooks/use-notes";
import { CheckboxProps, ChecklistProps } from "@/const";
import { unstable_batchedUpdates } from "react-dom";

import styles from "./checklist.module.css";

interface ChecklistsOptionsProps {
  children: React.ReactNode;
  setIsOptionsVisible: (visible: boolean) => void;
}

function ChecklistsOptions({ children, setIsOptionsVisible }: ChecklistsOptionsProps) {
  useEffect(() => {
    const onPageClick = (e: MouseEvent) => {
      document.getElementById("checklist-options-popup");
      if ((e.target as HTMLElement).id !== "checklist-options-popup") {
        setIsOptionsVisible(false);
      }
    };

    document.addEventListener("click", onPageClick);

    return () => {
      document.removeEventListener("click", onPageClick);
    };
  }, []);

  return (
    <div id="checklist-options-popup" className={styles.options}>
      {children}
    </div>
  );
}

interface ChecklistPropsComponent {
  id: string;
  title: string;
  data: ChecklistProps;
  checklist: CheckboxProps[];
  onClickRemoveNote: () => void;
  onClickEditNote: () => void;
}

export default function Checklist({
  id,
  title,
  data,
  checklist,
  onClickRemoveNote,
  onClickEditNote,
}: ChecklistPropsComponent) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const { handleEditChecklist } = useNotes();

  const handleToggleOptions = useCallback(() => {
    setIsOptionsVisible((prevState) => !prevState);
  }, []);

  const handleRemoveNote = useCallback(() => {
    onClickRemoveNote();
    setIsOptionsVisible(false);
  }, [onClickRemoveNote]);

  const handleCheckboxChange = useCallback(
    (id: string) => {
      const updatedChecklist = checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));

      unstable_batchedUpdates(() => {
        handleEditChecklist({ ...data, checklist: updatedChecklist });
      });
    },
    [checklist, handleEditChecklist]
  );

  return (
    <div id={`checklist-parent-${id}`} className={styles["checklist-parent"]} data-testid="checklist-parent">
      <Card variant="surface" style={{ position: "relative" }} data-testid="checklist-element">
        <Text as="span" size="3" weight="bold">
          {title}
        </Text>
        {checklist.map((item) => (
          <Flex key={`${item.id}`} direction="column" gap="4" mt="2">
            <Text as="label" size="2" style={{ cursor: "pointer" }}>
              {/* the onChange is NOT working in this Checkbox comp :/ */}
              <Checkbox size="3" color="cyan" onClick={() => handleCheckboxChange(item.id)} checked={item.checked} />
              <span style={{ marginLeft: "8px", cursor: "pointer" }}>{item.value}</span>
            </Text>
          </Flex>
        ))}

        <button
          className={styles.dots}
          onClick={handleToggleOptions}
          data-testid="button-dots-checklist"
          aria-label="Options"
        >
          <span className={styles["span-dots"]}></span>
        </button>
      </Card>
      {isOptionsVisible && (
        <ChecklistsOptions setIsOptionsVisible={setIsOptionsVisible}>
          <button key="btn-edit-checklist" onClick={onClickEditNote}>
            Edit checklist
          </button>
          <button key="btn-remove-checklist" onClick={handleRemoveNote}>
            Remove
          </button>
        </ChecklistsOptions>
      )}
    </div>
  );
}
