import { Pill, Popover, TextInput, TextInputProps } from "@mantine/core";
import { ReactNode, useRef, useState } from "react";
import { SearchList } from "./search-list";
import { useClickOutside } from "@mantine/hooks";
import { Item } from "./types";

export interface Props {
  renderItem?: (item: Item) => ReactNode;
  data: Item[];
  defaultValues?: { label: string; value: string }[];
  onOpenChange?: (open: boolean) => void;
  loading?: boolean;
  onChange?: (value: string[]) => void;
  label?: string;
  error?: string | boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  fetchNextPage?: Function;
  onSearchTermChange?: (keyword: string) => void;
  searchTerm?: string;
  textInputProps?: TextInputProps;
}

export function SelectSearchMultiple({
  data,
  defaultValues,
  onOpenChange,
  label,
  error,
  placeholder,
  fetchNextPage,
  loading,
  onChange,
  onSearchTermChange,
  renderItem,
  searchTerm,
  textInputProps,
}: Props) {
  const list = [
    ...(defaultValues ? defaultValues : []),
    ...data.filter(
      (item) => !defaultValues?.some(({ value }) => value === item.value)
    ),
  ];

  const [values, setValues] = useState<string[]>([]);

  const [open, setOpen] = useState(false);

  const handleItemSelect = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter((valueItem) => valueItem !== value)
      : [...values, value];
    if (onChange) onChange(newValues);
    setValues(newValues);
  };

  const ref = useClickOutside(() => setOpen(false));
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Popover
      onOpen={() => onOpenChange && onOpenChange(true)}
      opened={open}
      onClose={() => {
        setOpen(false);
        if (onOpenChange) onOpenChange(false);
      }}
      position="bottom"
      closeOnClickOutside
    >
      <Popover.Target>
        <TextInput
          {...textInputProps}
          ref={inputRef}
          height="auto"
          classNames={{ input: "!flex !px-2 !py-2 gap-2 !h-auto !flex-wrap" }}
          className="cursor-pointer"
          label={label}
          placeholder={placeholder}
          error={error}
          type="button"
          onClick={() => setOpen(!open)}
          component="button"
        >
          {list
            .filter(({ value }) => values.includes(value))
            .map(({ label, value }) => (
              <Pill
                key={value}
                withRemoveButton
                onRemove={() => handleItemSelect(value)}
              >
                {label}
              </Pill>
            ))}
        </TextInput>
      </Popover.Target>
      <Popover.Dropdown w={inputRef.current?.offsetWidth} ref={ref}>
        <SearchList
          renderItem={renderItem}
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          list={list}
          fetchNextPage={fetchNextPage}
          loading={loading}
          selected={values}
          onChange={({ value }) => handleItemSelect(value)}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
