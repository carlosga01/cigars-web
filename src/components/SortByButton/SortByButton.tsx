"use client";

import SortIcon from "@mui/icons-material/Sort";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export type SortBy =
  | "newest"
  | "oldest"
  | "rating-low-high"
  | "rating-high-low"
  | "price-low-high"
  | "price-high-low";

type Props = {
  selectedKey: SortBy;
};

const SortByButton: React.FC<Props> = ({ selectedKey }) => {
  const items = [
    { key: "newest", label: "Newest" },
    { key: "oldest", label: "Oldest" },
    { key: "rating-low-high", label: "Rating (low → high)" },
    { key: "rating-high-low", label: "Rating (high → low)" },
    { key: "price-low-high", label: "Price (low → high)" },
    { key: "price-high-low", label: "Price (high → low)" },
  ] as { key: SortBy; label: string }[];

  const onPress = (key: SortBy) => {
    const url = new URL(window.location.href);
    url.searchParams.set("sortBy", key);
    window.location.href = url.toString();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly color="primary" variant="faded">
          <SortIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        key={selectedKey}
        aria-label="Dynamic Actions"
        items={items}
        selectionMode="single"
        selectedKeys={[selectedKey]}
      >
        {(item) => (
          <DropdownItem key={item.key} onClick={() => onPress(item.key)}>
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortByButton;
