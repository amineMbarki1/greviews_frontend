import { Button, Modal, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListInputs, ListInputsSchema } from "../types/schemas";
import { useMutation, useQueryClient } from "react-query";
import { createList } from "../api/contact-api";
import { notifications } from "@mantine/notifications";

export function NewList() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListInputs>({ resolver: zodResolver(ListInputsSchema) });
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createList,
    onSuccess() {
      notifications.show({
        message: "Created successfully",
        color: "green",
      });
      queryClient.invalidateQueries("contact-lists");
      navigate(-1);
    },
  });

  return (
    <Modal opened onClose={() => navigate(-1)}>
      <form onSubmit={handleSubmit((val) => createMutation.mutate(val))}>
        <TextInput
          error={errors.name?.message}
          {...register("name")}
          label="name"
        />
        <Button
          loading={createMutation.isLoading}
          type="submit"
          variant="default"
          className="mt-2"
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
}
