//Selects multiple contacts

import { SelectSearchMultiple } from "@/shared/components/select-search/select-search-multiple";

import { useInfiniteContacts } from "../hooks/useInfiniteContacts";
import { Contact } from "../types/Contact";
import { Avatar } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

export function SelectContacts() {
  const { contacts, fetchNextPage, setFilters, isFetching, filters } =
    useInfiniteContacts();

  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="contacts"
      render={({ field }) => (
        <SelectSearchMultiple
          onChange={(values) => field.onChange(values)}
          onSearchTermChange={(name) => setFilters({ firstName: name })}
          searchTerm={filters.firstName as string | undefined}
          textInputProps={{ size: "md" }}
          loading={isFetching}
          fetchNextPage={fetchNextPage}
          label="Select Contacts"
          data={contacts.map((contact) => ({
            label: `${contact.firstName} ${contact.lastName}`,
            value: contact.id,
            extra: contact,
          }))}
          renderItem={(item) => {
            const contact = item.extra as Contact;
            return (
              <div>
                <div className="flex items-center">
                  <Avatar>{`${contact.firstName[0]}${contact.lastName[1]}`}</Avatar>
                  <div className="flex flex-col gap-1 ml-2 text-justify">
                    <div>{`${contact.firstName} ${contact.lastName}`}</div>
                    <div className="text-justify">
                      {contact.phone.primary.number}{" "}
                      {contact.phone.secondary?.number &&
                        `/ ${contact.phone.secondary.number}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />
      )}
    />
  );
}
