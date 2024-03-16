import { Text } from "@radix-ui/themes";
import { NewNote } from "../newNote";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Text as="span" size="5" weight="bold">
        SimpleNotes
      </Text>
      <NewNote />
    </div>
  );
};

export default Header;
