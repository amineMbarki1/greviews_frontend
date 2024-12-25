import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchContacts } from "../api/contact-api";
import { Contact } from "../types/Contact";

export function useInfiniteContacts(
  initialFilters?: Record<string, unknown>,
  enabled?: boolean
) {
  const [filters, setFilters] = useState<Record<string, unknown>>(
    initialFilters ?? {}
  );

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ["contact-lists", { filters }],
    fetchContacts,
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

  const contacts: Contact[] = [
    ...(data?.pages.flatMap(({ data }) => data.items) || []),
  ];

  return { contacts, fetchNextPage, isFetching, filters, setFilters };
}
