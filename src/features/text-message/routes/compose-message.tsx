import { Container, Paper, Text } from "@mantine/core";
import TextMessageForm from "../components/text-message-form";

export function ComposeMessage() {
  return (
    <Container size="lg">
      <Text component="h1" size="xl">
        New Text message
      </Text>
      <Paper className="mt-5 p-10" shadow="xl">
        <TextMessageForm />
      </Paper>
    </Container>
  );
}
