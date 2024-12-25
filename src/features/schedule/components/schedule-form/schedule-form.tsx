import {
  Text,
  Divider,
  Box,
  Input,
  Select,
  NumberInput,
  Checkbox,
  Group,
  Switch,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { IconClock, IconCalendar } from "@tabler/icons-react";
import { Controller, useFormContext } from "react-hook-form";
import { TimezonePicker } from "./timezone-picker";
import { useState } from "react";

type End = "never" | "on" | "after";

export default function ScheduleForm() {
  const { control, watch, setValue } = useFormContext();
  const frequency = watch("repeat.frequency");
  const [end, setEnd] = useState<End>("never");
  const [repeat, setRepeat] = useState(false);

  return (
    <>
      <Text component="h2" size="lg" fw="bold">
        Schedule a message
      </Text>
      <Divider />

      <Input.Wrapper label="First send date" size="md">
        <Box display="flex" className="gap-2">
          <Controller
            name="time"
            render={({ field }) => (
              <TimeInput
                {...field}
                onChange={(e) => field.onChange(e.currentTarget.value + ":00")}
                size="md"
                leftSection={<IconClock />}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DateInput
                onBlur={field.onBlur}
                onChange={field.onChange}
                size="md"
                className="grow"
                leftSection={<IconCalendar />}
              />
            )}
          />
        </Box>
      </Input.Wrapper>
      <TimezonePicker />
      <Switch
        onChange={(event) => {
          setRepeat(event.currentTarget.checked);
          if (!event.currentTarget.checked) setValue("repeat", null);
        }}
      />

      {repeat && (
        <>
          <Box display="grid" className="grid-cols-2 gap-2">
            <Controller
              name="repeat.frequency"
              control={control}
              render={({ field }) => (
                <Select
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  size="md"
                  label="Repeat"
                  defaultValue="none"
                  data={[
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                    { value: "monthly", label: "Monthly" },
                    { value: "yearly", label: "Yearly" },
                    { value: "hourly", label: "Hourly" },
                    { value: "none", label: "None (Run once)" },
                  ]}
                />
              )}
            />
            {frequency !== "none" && (
              <Controller
                name="repeat.interval"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    size="md"
                    label="Every (Interval)"
                  />
                )}
              />
            )}
          </Box>

          {frequency === "weekly" && (
            <Controller
              name="repeat.daysOfWeek"
              control={control}
              render={({ field }) => (
                <Checkbox.Group
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  label="Days of week"
                  className="mt-2"
                >
                  <Group className="!gap-1">
                    {[
                      "sunday",
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                    ].map((day) => (
                      <Checkbox.Card
                        className="!w-fit !p-2"
                        radius="md"
                        value={day}
                        key={day}
                      >
                        <Group align="flex-start">
                          <Checkbox.Indicator />
                          <Text>{day}</Text>
                        </Group>
                      </Checkbox.Card>
                    ))}
                  </Group>
                </Checkbox.Group>
              )}
            />
          )}

          {frequency !== "none" && (
            <>
              <Text component="h3" size="md" fw="bold">
                End
              </Text>
              <Divider />
              <Box display="grid" className="grid-cols-2 gap-2">
                <Select
                  value={end}
                  onChange={(val) => setEnd(val as End)}
                  size="md"
                  label="End"
                  data={[
                    { label: "Never", value: "never" },
                    { label: "After", value: "after" },
                    { label: "On", value: "on" },
                  ]}
                />

                {end === "after" && (
                  <Controller
                    name="repeat.end"
                    render={({ field }) => (
                      <NumberInput {...field} size="md" label="After" />
                    )}
                  />
                )}
                {end === "on" && (
                  <Controller
                    name="repeat.end"
                    render={({ field }) => (
                      <DateInput
                        {...field}
                        size="md"
                        label="On"
                        leftSection={<IconCalendar />}
                      />
                    )}
                  />
                )}
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
