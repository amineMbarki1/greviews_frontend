

import {
  Table,
  Paper,
  LoadingOverlay,
  Avatar,
  Button,
  Box,
  Pagination,
} from "@mantine/core";
import ContactsFilterMenu from "./contacts-filter-menu";
import { useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchContacts } from "../api/contact-api";

export function ContactsTable() {
  const [searchParams, _] = useSearchParams();
  const listId = searchParams.get("listId");

  
  const [filters, setFilters] = useState<Record<string, unknown>>(
    listId ? { list: { id: listId } } : {}
  );
  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useQuery(
    ["contacts", { filters, page }],
    {
      queryFn: fetchContacts,
    }
  );

  const result = data?.data;
  const rows = result?.items.map((contact) => (
    <Table.Tr>
      <Table.Td>
        <Box display="flex" className="items-center text-nowrap gap-2">
          <Avatar>{contact.firstName[0] + contact.lastName[0]}</Avatar>
          {`${contact.firstName} ${contact.lastName}`}
        </Box>
      </Table.Td>
      <Table.Td>{contact.email}</Table.Td>
      <Table.Td>
        <div className="font-semibold">{contact.phone.primary.number}</div>
        <div>{contact.phone.secondary?.number}</div>
      </Table.Td>
      <Table.Td>{contact.list.name}</Table.Td>
      <Table.Td>{contact.company}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Paper display="flex" className="mb-2 p-2 items-center" shadow="xs">
        <Button component={Link} to="new" className="mr-auto" variant="default">
          New Contact
        </Button>
        <ContactsFilterMenu onApplyFilters={setFilters} />
      </Paper>

      <Paper
        display="flex"
        classNames={{ root: "flex-col" }}
        mih={300}
        pos="relative"
        shadow="xs"
        className="p-2 overflow-auto"
      >
        <LoadingOverlay
          visible={isFetching}
          zIndex={1}
          overlayProps={{ blur: 1 }}
          loaderProps={{ type: "bars" }}
        />
        {result && (
          <>
            <Table maw={"100%"}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>List</Table.Th>
                  <Table.Th>Company</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination
              mt="auto"
              size="sm"
              style={{ marginTop: 50 }}
              onChange={setPage}
              value={page}
              total={result.totalPages}
            />
          </>
        )}
      </Paper>
    </>
  );
}
