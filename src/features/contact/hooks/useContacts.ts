import { useQuery } from "react-query";
import { useState } from "react";
import { QueryParams } from "../../../api/QueryParams";
import { fetchContacts } from "../api/contact-api";

export function useContacts(query: QueryParams, enabled?: boolean) {
  const [filters, setFilters] = useState<Record<string, unknown>>(
    query.filters ?? {}
  );
  const [page, setPage] = useState(query.page ?? 1);

  const { data, isFetching, error } = useQuery(
    ["contacts", { filters, page }],
    {
      queryFn: fetchContacts,
      enabled,
    }
  );

  return { data, isFetching, error, setFilters, setPage };
}
