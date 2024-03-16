import { Card, Text, Button } from "@radix-ui/themes";

export default function Note({ title, note, onClick }: { title: string; note: string; onClick: () => void }) {
  return (
    <Card variant="surface" style={{ position: "relative" }} data-testid="note-element">
      <Text as="div" size="3" weight="bold">
        {title}
      </Text>
      <Text as="div" color="gray" size="2">
        {note}
      </Text>
      <Button size="3" variant="soft" color="ruby" style={{ position: "absolute", top: 0, right: 0 }} onClick={onClick}>
        <Text as="span" color="ruby" size="3">
          x
        </Text>
      </Button>
    </Card>
  );
}
