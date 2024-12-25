import { Button, Divider, Text, TextInput } from "@mantine/core";

import { FormProvider, useForm } from "react-hook-form";

import { SelectContacts } from "@/features/contact/components/select-contacts";
import SelectContactLists from "@/features/contact/components/select-contact-lists";
import { TextMessageInput } from "./text-message-input";
import ScheduleForm from "../../schedule/components/schedule-form/schedule-form";
import { IconCheck, IconSend } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextMessageInputs, TextMessageInputsSchema } from "../types/schemas";
import { useMutation } from "react-query";
import { createTextMessage } from "../text-messgae-api";

export default function TextMessageForm() {
  const form = useForm<TextMessageInputs>({
    resolver: zodResolver(TextMessageInputsSchema),
  });

  const createTextMessageMutation = useMutation({
    mutationFn: createTextMessage,
    onSuccess (data) {
      console.log(data);
    },
  });

  const { errors } = form.formState;
  console.log(errors);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log(values);
          createTextMessageMutation.mutate(values);
        })}
        className="flex flex-col gap-5"
      >
        <Text size="lg" component="h2" fw="bold">
          Recipients
        </Text>

        <SelectContacts />
        <SelectContactLists />
        <Divider />

        <Text component="h2" size="lg" fw="bold">
          Sender
        </Text>

        <TextInput
          {...form.register("from")}
          size="md"
          label="From"
          inputMode="tel"
        />

        <Divider />

        <TextMessageInput />

        <Button
          rightSection={<IconSend />}
          type="submit"
          className="self-end"
          variant="default"
        >
          Send
        </Button>

        <ScheduleForm />

        <Button
          loading={createTextMessageMutation.isLoading}
          rightSection={<IconCheck />}
          type="submit"
          className="self-end"
          variant="default"
        >
          Confirm
        </Button>
      </form>
    </FormProvider>
  );
}
