import { Text, TextField, Button } from "@radix-ui/themes";
import styles from "./searchBar.module.css";

export default function SearchBar({
  value,
  onChange,
  onClickReset,
}: {
  value: string;
  onChange: (e: any) => void;
  onClickReset: () => void;
}) {
  return (
    <div className={styles.box} data-testid="box-search-bar">
      <label htmlFor="search-note">
        <Text as="span" size="3" weight="bold">
          Search note
        </Text>
        <TextField.Input
          id="search-note"
          type="text"
          placeholder="Search for the title or body of the note"
          name="search-note"
          value={value}
          onChange={onChange}
          radius="large"
        />
      </label>
      <Button size="1" variant="soft" color="ruby" onClick={onClickReset}>
        x
      </Button>
    </div>
  );
}
