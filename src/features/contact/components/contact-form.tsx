import { Box, Button, Select, TextInput } from "@mantine/core";

import { Controller, useForm } from "react-hook-form";
import { ContactInputsSchema, ContactInputs } from "../types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContactList } from "./select-contact-list";
import { useMutation } from "react-query";
import { createContact } from "../api/contact-api";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";

interface Props {
  onSuccess?: () => void;
}
export function ContactForm({ onSuccess }: Props) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ContactInputs>({ resolver: zodResolver(ContactInputsSchema) });

  const queryClient = useQueryClient();

  const createContactMutation = useMutation({
    mutationFn: createContact,
    onSuccess() {
      if (onSuccess) onSuccess();
      notifications.show({ message: "Created successfully" });
      queryClient.invalidateQueries("contacts");
    },
    onError(error) {
      console.log(error);
      if (error instanceof Error) console.log(error.message);
      notifications.show({
        message: "Oops an Error! was encountered",
        color: "red",
      });
    },
  });

  return (
    <form
      className="flex flex-col gap-y-2.5"
      onSubmit={handleSubmit((vals) => createContactMutation.mutate(vals))}
    >
      <TextInput
        error={errors.firstName?.message}
        label="First Name"
        placeholder="Last name"
        {...register("firstName")}
      />
      <TextInput
        error={errors.lastName?.message}
        label="Last Name"
        placeholder="Last name"
        {...register("lastName")}
      />
      <TextInput
        error={errors.email?.message}
        label="Email"
        placeholder="Email"
        {...register("email")}
      />
      <Box display="flex" className="gap-2">
        <TextInput
          error={errors.phone?.primary?.number?.message}
          className="min-w-[60%]"
          {...register("phone.primary.number")}
          label="Primary phone"
        />
        <Controller
          control={control}
          name="phone.primary.type"
          render={({ field }) => (
            <Select
              errorProps={{ error: errors.phone?.primary?.message }}
              {...field}
              label="Type"
              data={["mobile", "landline"]}
            />
          )}
        />
      </Box>
      <Box display="flex" className="gap-2">
        <TextInput
          wrapperProps={{ className: "min-w-[60%] grow-[2]" }}
          {...register("phone.secondary.number")}
          label="Secondary phone"
        />
        <Controller
          control={control}
          name="phone.secondary.type"
          render={({ field }) => (
            <Select {...field} label="Type" data={["mobile", "landline"]} />
          )}
        />
      </Box>
      <TextInput label="Company" {...register("company")} />

      <Controller
        name="list"
        control={control}
        render={({ field }) => <SelectContactList onChange={field.onChange} />}
      />

      <Button
        loading={createContactMutation.isLoading}
        type="submit"
        variant="default"
        className="mt-2"
      >
        Submit
      </Button>
    </form>
  );
}
