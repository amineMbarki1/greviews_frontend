import { ContactListsTable } from "../components/contact-lists-table";
import { Title } from "@mantine/core";
export function ContactLists() {
  return (
    <section>
      <Title size="h2" order={1}>My Lists</Title>

      <ContactListsTable />
    </section>
  );
}
