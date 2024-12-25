import {
  TextInput,
  ScrollArea,
  Loader,
  Button,
  Box,
  Text,
} from "@mantine/core";
import { IconCheck, IconSearch } from "@tabler/icons-react";
import { Item } from "./types";
import { ReactNode } from "react";

interface Props {
  renderItem?: (item: Item) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  fetchNextPage?: Function;
  onSearchTermChange?: (keyword: string) => void;
  searchTerm?: string;
  loading?: boolean;
  list: Item[];
  onChange?: (item: { label: string; value: string }) => void;
  selected?: string[];
}

export function SearchList({
  searchTerm,
  onSearchTermChange,
  fetchNextPage,
  loading,
  list,
  onChange,
  selected = [],
  renderItem,
}: Props) {
  return (
    <>
      <TextInput
        value={searchTerm ?? ""}
        onChange={(e) => {
          if (onSearchTermChange) onSearchTermChange(e.target.value);
        }}
        leftSection={<IconSearch />}
        className="mt-2"
      />
      <ScrollArea
        onBottomReached={() => !loading && fetchNextPage && fetchNextPage()}
        h={250}
        className="mt-2"
      >
        <Box display="flex" className="flex-col gap-y-1">
          {list.map((item) => (
            <Button
              p={0}
              h={"auto"}
              onClick={() => onChange && onChange(item)}
              variant="subtle"
              color="dark"
              className="font-thin justify-start"
              key={item.value}
              fw="normal"
              justify="left"
              leftSection={
                selected.includes(item.value) ? <IconCheck size={15} /> : null
              }
            >
              {renderItem ? renderItem(item) : item.label}
            </Button>
          ))}

          {list.length === 0 && !loading && <Text>No Results found</Text>}
          {loading && <Loader className="mx-auto" size="xs" />}
        </Box>
      </ScrollArea>
    </>
  );
}
