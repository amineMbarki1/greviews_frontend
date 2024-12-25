import { Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ContactForm } from "../components/contact-form";
export function NewContact() {
  const navigate = useNavigate();
  return (
    <Modal opened onClose={() => navigate(-1)}>
      <ContactForm onSuccess={() => navigate(-1)} />
    </Modal>
  );
}
