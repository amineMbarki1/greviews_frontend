import { Outlet } from "react-router-dom";
import { ContactsTable } from "../components/contacts-table";

export function Contacts() {
  return (
    <>
      <Outlet />
      <ContactsTable />
    </>
  );
}
