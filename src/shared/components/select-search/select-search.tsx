import { useState } from "react";
import {
  Box,
  Button,
  Loader,
  Popover,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconSearch } from "@tabler/icons-react";

export interface Props {
  data: { label: string; value: string }[];
  defaultValue?: { label: string; value: string };
  onOpenChange?: (open: boolean) => void;
  loading?: boolean;
  onChange?: (value: string | null) => void;
  label?: string;
  error?: string | boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  fetchNextPage: Function;
  onSearchTermChange?: (keyword: string) => void;
  searchTerm?: string;
}

export function SelectSearch({
  data,
  defaultValue,
  fetchNextPage,
  searchTerm,
  onSearchTermChange,
  onOpenChange,
  onChange,
  loading,
  label,
  error,
  placeholder,
}: Props) {
  const list = [
    ...(defaultValue ? [defaultValue] : []),
    ...data.filter((item) => item.value !== defaultValue?.value),
  ];

  const [value, setValue] = useState<string | null>(
    defaultValue?.value ?? null
  );

  const [open, setOpen] = useState(false);
  return (
    <Popover
      onOpen={() => onOpenChange && onOpenChange(true)}
      opened={open}
      onClose={() => {
        setOpen(false);
        if (onOpenChange) onOpenChange(false);
      }}
      position="bottom"
      closeOnClickOutside
    >
      <Popover.Target>
        <TextInput
          className="cursor-pointer"
          label={label}
          placeholder={placeholder}
          error={error}
          type="button"
          onClick={() => setOpen(!open)}
          component="button"
        >
          {list.find((item) => item.value === value)?.label ?? "Select"}
        </TextInput>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput
          value={searchTerm ?? ""}
          onChange={(e) => {
            if (onSearchTermChange) onSearchTermChange(e.target.value);
          }}
          leftSection={<IconSearch />}
          className="mt-2"
        />
        <ScrollArea
          onBottomReached={() => !loading && fetchNextPage()}
          h={250}
          className="mt-2"
        >
          <Box display="flex" className="flex-col gap-y-1">
            {list.map((item) => (
              <Button
                onClick={() => {
                  setValue((val) => (item.value === val ? null : item.value));
                  if (onChange)
                    onChange(item.value === value ? null : item.value);
                }}
                variant="subtle"
                color="dark"
                className="font-thin justify-start"
                key={item.value}
                fw="normal"
                justify="left"
                leftSection={
                  value === item.value ? <IconCheck size={15} /> : null
                }
              >
                {item.label}
              </Button>
            ))}

            {list.length === 0 && <Text>No Results found</Text>}
            {loading && <Loader className="mx-auto" size="xs" />}
          </Box>
        </ScrollArea>
      </Popover.Dropdown>
    </Popover>
  );
}
