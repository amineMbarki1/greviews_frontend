import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Root } from "./root";
import ErrorPage from "./error-page";
import { ContactLists } from "./features/contact/routes/contact-lists";
import { Contacts } from "./features/contact/routes/contacts";
import { NewList } from "./features/contact/routes/new-list";
import { Notifications } from "@mantine/notifications";
import { NewContact } from "./features/contact/routes/new-contact";
import { routes as textMessageRoutes } from "./features/text-message/routes";
import '@mantine/dates/styles.css';

import { Test } from "./test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "test", element: <Test /> },
      {
        path: "contact-lists",
        element: <ContactLists />,
        children: [{ path: "new", element: <NewList /> }],
      },
      {
        path: "contacts",
        element: <Contacts />,
        children: [{ path: "new", element: <NewContact /> }],
      },
      textMessageRoutes,
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
