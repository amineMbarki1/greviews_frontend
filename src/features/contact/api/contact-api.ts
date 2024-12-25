import { httpClient } from "../../../api/http-client";
import { List } from "../types/List";
import { PaginatedResult } from "../../../api/PaginatedResult";
import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryParams } from "../../../api/QueryParams";
import { ContactInputs, ListInputs } from "../types/schemas";
import { Contact } from "../types/Contact";

export function fetchContactLists({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<[string, QueryParams]>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, queryParams] = queryKey;
  if (pageParam && typeof pageParam === "number")
    queryParams["page"] = pageParam;

  return httpClient
    .get<{ data: PaginatedResult<List> }>("/lists", { params: queryParams })
    .then((res) => res.data);
}

export function createList(list: ListInputs) {
  return httpClient
    .post<{ data: List }>("/lists", list)
    .then((res) => res.data);
}

export function createContact(contact: ContactInputs) {
  let formatted: ContactInputs | null = null;
  if (contact.phone.secondary?.number.length === 0) {
    formatted = Object.assign({}, contact);
    delete formatted.phone.secondary;
  }

  return httpClient
    .post<{ data: Contact }>("/contacts", formatted ?? contact)
    .then((res) => res.data);
}

export function fetchContacts({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<[string, QueryParams]>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, queryParams] = queryKey;
  if (pageParam && typeof pageParam === "number")
    queryParams["page"] = pageParam;
  return httpClient
    .get<{ data: PaginatedResult<Contact> }>("/contacts", {
      params: queryParams,
    })
    .then((res) => res.data);
}
