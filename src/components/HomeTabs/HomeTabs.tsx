"use client";

import { Tabs, Tab } from "@nextui-org/tabs";

type Props = {
  tab?: "me" | "all";
};

export default function HomeTabs({ tab }: Props) {
  const onPress = (key: "me" | "all") => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", key);
    window.location.href = url.toString();
  };

  return (
    <div className="flex flex-col">
      <Tabs
        aria-label="Review types"
        selectedKey={tab}
        color="primary"
        variant="solid"
        size="lg"
        onSelectionChange={(key) => onPress(key as "me" | "all")}
      >
        <Tab key="me" title="My Reviews"></Tab>
        <Tab key="all" title="All reviews"></Tab>
      </Tabs>
    </div>
  );
}
