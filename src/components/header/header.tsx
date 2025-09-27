import { Text } from "@radix-ui/themes";
import { NewNote } from "../newNote";
import { IconSimpleNotes } from "../icons/icons";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Text as="span" size="7" weight="bold" color="blue" className={styles["title-logo"]}>
        <IconSimpleNotes />
        SimpleNotes
      </Text>
      <NewNote />
    </div>
  );
};

export default Header;
