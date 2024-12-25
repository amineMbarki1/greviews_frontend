import {
  SelectSearch,
  Props as SelectSearchProps,
} from "../../../shared/components/select-search/select-search";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchContactLists } from "../api/contact-api";
import { List } from "../types/List";

interface Props {
  defaultValue?: List;
  onChange?: SelectSearchProps["onChange"];
}

export function SelectContactList({ defaultValue, onChange }: Props) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ["contact-lists", { filters: { name } }],
    fetchContactLists,
    {
      onError(error) {
        console.error(error);
      },

      keepPreviousData: true,
      enabled: open,
      getNextPageParam: (lastPage) => {
        return lastPage.data.page === lastPage.data.totalPages
          ? undefined
          : lastPage.data.page + 1;
      },
    }
  );

  const contactLists: List[] = [
    ...(data?.pages.flatMap(({ data }) => data.items) || []),
  ];

  const defaultSelected = defaultValue
    ? { label: defaultValue.name, value: defaultValue.id }
    : undefined;

  return (
    <SelectSearch
      onChange={onChange}
      onOpenChange={setOpen}
      loading={isFetching}
      onSearchTermChange={setName}
      searchTerm={name}
      fetchNextPage={fetchNextPage}
      defaultValue={defaultSelected}
      data={contactLists.map(({ id, name }) => ({ label: name, value: id }))}
    />
  );
}
