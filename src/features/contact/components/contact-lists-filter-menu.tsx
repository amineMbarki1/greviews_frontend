import { Popover, ActionIcon, TextInput, Button } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { useRef } from "react";

export interface Props {
  name: string;
  handleChange: (name: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ContactListsFilterMenu({ name, handleChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Popover shadow="md" width={200}>
      <Popover.Target>
        <ActionIcon variant="default">
          <IconFilter />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown onClick={(e) => e.stopPropagation()}>
        <TextInput
          className="mb-2"
          ref={ref}
          size="xs"
          label="Name"
          placeholder="Filter By name"
        />
        <Button
          onClick={() => handleChange(ref.current?.value ?? "")}
          className="mb-1"
          variant="outline"
          size="xs"
        >
          Apply
        </Button>
        <br />
        <Button onClick={() => handleChange("")} variant="default" size="xs">
          Reset
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
}
