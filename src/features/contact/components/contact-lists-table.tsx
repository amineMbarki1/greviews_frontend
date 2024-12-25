import { createSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Table,
  Paper,
  Button,
  LoadingOverlay,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { Pagination } from "@mantine/core";
import { useQuery } from "react-query";
import { fetchContactLists } from "../api/contact-api";
import {
  IconDotsVertical,
  IconExternalLink,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { ContactListsFilterMenu } from "./contact-lists-filter-menu";
import { QueryParams } from "../../../api/QueryParams";
import { Link, Outlet } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export function ContactListsTable() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { data, isLoading, isRefetching, error } = useQuery(
    ["contact-lists", { page, filters: { name } }] as [string, QueryParams],
    { queryFn: fetchContactLists, keepPreviousData: true }
  );

  const result = data?.data;

  if (error instanceof Error)
    notifications.show({
      message: error.message,
      color: "red",
      autoClose: false,
    });

  const rows = result?.items.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.contactsCount}</Table.Td>
      <Table.Td w={0}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() =>
                navigate({
                  pathname: "/contacts",
                  search: createSearchParams({ listId: element.id }).toString(),
                })
              }
              leftSection={<IconExternalLink />}
            >
              View Contacts
            </Menu.Item>
            <Menu.Item leftSection={<IconPencil />}>Edit</Menu.Item>
            <Menu.Item leftSection={<IconTrash />}>Remove</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Outlet />
      <>
        <Paper display="flex" shadow="xs" className="p-2 mb-2 items-center">
          <Button
            className="mr-auto"
            leftSection={<IconPlus />}
            size="sm"
            variant="default"
            component={Link}
            to="new"
          >
            New List
          </Button>
          <ContactListsFilterMenu
            name={name}
            handleChange={(name) => setName(name)}
          />
        </Paper>
        <Paper mih={300} pos="relative" shadow="xs" className="p-2">
          <LoadingOverlay
            visible={isRefetching || isLoading}
            zIndex={1}
            overlayProps={{ blur: 1 }}
            loaderProps={{ type: "bars" }}
          />
          {result && (
            <>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>#Contacts</Table.Th>
                    <Table.Th />
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
              <Pagination
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
    </>
  );
}
