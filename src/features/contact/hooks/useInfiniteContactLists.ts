import { useInfiniteQuery } from "react-query";
import { fetchContactLists } from "../api/contact-api";
import { useState } from "react";
import { List } from "../types/List";

export function useInfiniteContactLists(enabled?: boolean) {
  const [name, setName] = useState("");

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ["contact-lists", { filters: { name } }],
    fetchContactLists,
    {
      onError(error) {
        console.error(error);
      },

      keepPreviousData: true,
      enabled: enabled,
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

  return { contactLists, fetchNextPage, isFetching, setName, name };
}
