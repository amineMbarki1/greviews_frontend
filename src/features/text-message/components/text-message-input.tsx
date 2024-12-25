import { Input } from "@mantine/core";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { MentionsInput, Mention } from "react-mentions";
const styles = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "inherit",
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      minHeight: 150,
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

export function TextMessageInput() {
  const [content, setContent] = useState("");

  const { control } = useFormContext();
  const { field } = useController({ control, name: "content" });

  return (
    <Input.Wrapper size="lg" label="Message">
      <MentionsInput
        style={styles}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          field.onChange(e.target.value);
        }}
      >
        <Mention
          style={{ backgroundColor: "#ccc" }}
          trigger="@["
          data={[{ id: "first-name", display: "first name" }]}
        />
      </MentionsInput>
    </Input.Wrapper>
  );
}
