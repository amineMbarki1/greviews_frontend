//selects multiple contacts

import { SelectSearchMultiple } from "@/shared/components/select-search/select-search-multiple";
import { useInfiniteContactLists } from "../hooks/useInfiniteContactLists";
import { Controller, useFormContext } from "react-hook-form";

export default function SelectContactLists() {
  const { contactLists, setName, isFetching, name } = useInfiniteContactLists();

  const { control } = useFormContext();

  return (
    <Controller
      name="lists"
      control={control}
      render={({ field }) => (
        <SelectSearchMultiple
          onChange={field.onChange}
          textInputProps={{ size: "md" }}
          label="Select lists"
          loading={isFetching}
          searchTerm={name}
          onSearchTermChange={setName}
          data={contactLists.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
        />
      )}
    />
  );
}
