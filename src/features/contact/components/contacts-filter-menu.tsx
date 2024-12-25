import {
  ActionIcon,
  Box,
  Button,
  Popover,
  Text,
  TextInput,
} from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { useState } from "react";
import _ from "lodash";
import { SelectContactList } from "./select-contact-list";
import { useSearchParams } from "react-router-dom";
import { flattenObject } from "../../../utils";

export interface Props {
  onApplyFilters: (filters: Record<string, unknown>) => void;
}

export default function ContactsFilterMenu({ onApplyFilters }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  function handleFilterChange(path: string, value: string) {
    setFilters((prev) => {
      const newFilters = Object.assign({}, prev);
      _.set(newFilters, path, value);
      return newFilters;
    });
  }

  const onFiltersChange = handleFilterChange;
  const [open, setOpen] = useState(false);
  return (
    <Popover
      opened={open}
      onClose={() => setOpen(false)}
      shadow="md"
      width={200}
      keepMounted
    >
      <Popover.Target>
        <ActionIcon onClick={() => setOpen((open) => !open)} variant="default">
          <IconFilter />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        <Box display="flex" className="items-center content-between">
          <Text>Filters</Text>
          <Button
            onClick={() => {
              onApplyFilters({});
              setOpen(false);
            }}
          >
            Reset
          </Button>
        </Box>
        <TextInput
          size="xs"
          label="first name"
          placeholder="first name"
          onChange={(e) => onFiltersChange("firstName", e.target.value)}
        />
        <TextInput
          size="xs"
          label="last name"
          placeholder="last name"
          onChange={(e) => onFiltersChange("lastName", e.target.value)}
        />

        <TextInput
          size="xs"
          label="primary phone"
          onChange={(e) =>
            onFiltersChange("phone.primary.number", e.target.value)
          }
        />
        <TextInput
          size="xs"
          label="Company"
          onChange={(e) => onFiltersChange("company", e.target.value)}
        />
        <SelectContactList
          onChange={(id) => id && onFiltersChange("list.id", id)}
        />
        <Button
          onClick={() => {
            onApplyFilters(filters);
            setSearchParams(
              new URLSearchParams(
                flattenObject(filters, undefined, (path, oldKEy) =>
                  path === "list.id" ? "listId" : oldKEy
                )
              )
            );
            setOpen(false);
          }}
          className="mt-2"
          variant="outline"
          size="xs"
        >
          Apply
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
}
