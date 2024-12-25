import { RouteObject } from "react-router-dom";
import { ComposeMessage } from "./routes/compose-message";

export const routes: RouteObject = {
  path: "/text-message",
  children: [{ path: "compose", element: <ComposeMessage /> }],
};
