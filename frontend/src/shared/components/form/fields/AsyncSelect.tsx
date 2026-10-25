import { Combobox, Portal, createListCollection } from "@ark-ui/react";
import { useAsyncList } from "@ark-ui/react/collection";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as styles from "./Input.variants";

export type AsyncSelectOption = {
  label: string;
  value: string;
};

export type LoadOptions = (
  filterText: string,
  signal?: AbortSignal,
) => Promise<AsyncSelectOption[]>;

export type AsyncSelectProps = {
  clearLabel: string;
  emptyLabel: string;
  error?: string;
  label: string;
  loadingLabel: string;
  loadOptions: LoadOptions;
  name: string;
  onChange: (value: number | null) => void;
  placeholder?: string;
  value: number | null | undefined;
};

const SEARCH_DEBOUNCE_MS = 300;

const AsyncSelect = ({
  clearLabel,
  emptyLabel,
  error,
  label,
  loadingLabel,
  loadOptions,
  name,
  onChange,
  placeholder,
  value,
}: AsyncSelectProps) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const list = useAsyncList<AsyncSelectOption>({
    autoReload: true,
    load: async ({ filterText, signal }) => ({
      items: await loadOptions(filterText, signal),
    }),
  });

  const collection = useMemo(
    () =>
      createListCollection({
        items: list.items,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
      }),
    [list.items],
  );

  const selectedValue = value == null ? "" : String(value);
  const selectedLabel =
    collection.items.find((item) => item.value === selectedValue)?.label ?? "";

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const scheduleSearch = (filterText: string) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => list.setFilterText(filterText),
      SEARCH_DEBOUNCE_MS,
    );
  };

  return (
    <Combobox.Root
      collection={collection}
      inputValue={searchValue ?? selectedLabel}
      onInputValueChange={({ inputValue, reason }) => {
        if (reason === "input-change") {
          setSearchValue(inputValue);
          scheduleSearch(inputValue);
          return;
        }
        setSearchValue(null);
      }}
      onOpenChange={({ open }) => {
        if (open) return;
        setSearchValue(null);
        if (list.filterText) list.setFilterText("");
      }}
      onValueChange={({ value: nextValue }) => {
        onChange(nextValue[0] ? Number(nextValue[0]) : null);
      }}
      value={selectedValue ? [selectedValue] : []}
    >
      <Combobox.Control className="relative w-full">
        <Combobox.Input
          id={name}
          className={styles.input({
            className: "pr-16",
            variant: error ? "error" : "default",
          })}
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
          {selectedValue && (
            <Combobox.ClearTrigger
              aria-label={clearLabel}
              className="cursor-pointer rounded p-0.5 text-muted-foreground hover:text-foreground"
              type="button"
            >
              <X className="size-4" />
            </Combobox.ClearTrigger>
          )}
          <Combobox.Trigger
            aria-label={label}
            className="cursor-pointer rounded p-0.5 text-muted-foreground hover:text-foreground"
            type="button"
          >
            {list.loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ChevronsUpDown className="size-4" />
            )}
          </Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner className="z-50">
          <Combobox.Content className="mt-1 max-h-60 w-(--reference-width) overflow-y-auto rounded-xl border-2 border-input bg-ui-surface p-1 shadow-lg">
            {list.loading ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                {loadingLabel}
              </div>
            ) : list.empty ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                {emptyLabel}
              </div>
            ) : (
              collection.items.map((item) => (
                <Combobox.Item
                  key={item.value}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-ui-secondary-100"
                  item={item}
                >
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator>
                    <Check className="size-4" />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
};

export default AsyncSelect;
