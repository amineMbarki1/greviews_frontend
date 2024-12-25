import {
  Box,
  Button,
  Input,
  Popover,
  ScrollArea,
  Select,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchContactLists } from "./features/contact/api/contact-api";
import { IconCheck, IconSearch } from "@tabler/icons-react";
import { SelectContactList } from "./features/contact/components/select-contact-list";

export function Test({
  defaultValue,
}: {
  defaultValue?: { id: string; name: string };
}) {
  const [name, setName] = useState("");
  const { data, fetchNextPage } = useInfiniteQuery(
    ["contact-lists", { filters: { name } }],
    fetchContactLists,
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        return lastPage.data.page === lastPage.data.totalPages
          ? undefined
          : lastPage.data.page + 1;
      },
    }
  );

  const contactLists = [
    ...(defaultValue ? [defaultValue] : []),
    ...(data?.pages
      .flatMap(({ data }) => data.items)
      .filter((c) => c.id !== defaultValue?.id) || []),
  ];

  const [value, setValue] = useState<string | null>(defaultValue?.id ?? null);
  const [open, setOpen] = useState(false);

  return <SelectContactList />;
  return (
    <Popover opened={open} onClose={() => setOpen(false)} position="bottom">
      <Popover.Target>
        <Input onClick={() => setOpen(!open)} component="button">
          {contactLists.find(({ id }) => id === value)?.name ?? "Select"}
        </Input>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput
          onChange={(e) => setName(e.target.value)}
          leftSection={<IconSearch />}
          className="mt-2"
        />
        <ScrollArea onBottomReached={fetchNextPage} h={250} className=" mt-2 ">
          <Box display="flex" className="flex-col gap-y-1">
            {contactLists.map(({ name, id }) => (
              <Button
                onClick={() => {
                  setValue((val) => (id === val ? null : id));
                }}
                variant="subtle"
                color="dark"
                className="font-thin justify-start"
                key={id}
                fw="normal"
                justify="left"
                leftSection={value === id ? <IconCheck size={15} /> : null}
              >
                {name}
              </Button>
            ))}
          </Box>
        </ScrollArea>
      </Popover.Dropdown>
    </Popover>
  );
}
