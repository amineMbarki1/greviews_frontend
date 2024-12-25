import { Select } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";

const canadianTimeZones = [
  "America/Vancouver", // Pacific Standard Time (PST)
  "America/Edmonton", // Mountain Standard Time (MST)
  "America/Winnipeg", // Central Standard Time (CST)
  "America/Toronto", // Eastern Standard Time (EST)
  "America/Halifax", // Atlantic Standard Time (AST)
  "America/St_Johns", // Newfoundland Standard Time (NST)
];

export function TimezonePicker() {
  const { control } = useFormContext();
  const { field } = useController({ control, name: "timezone" });

  return (
    <Select {...field} data={canadianTimeZones} label="Timezone" size="md" />
  );
}
