import { List } from "./List";

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: {
    primary: { number: string; type: "landline" | "mobile" };
    secondary?: { number: string; type: "landline" | "mobile" };
  };

  company?: string;
  list: List;
  id: string;
  createdAt: string;
  updatedAt: string;
}
