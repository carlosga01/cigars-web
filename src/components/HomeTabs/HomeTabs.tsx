"use client";

import { Tabs, Tab } from "@nextui-org/tabs";

type Props = {
  tab?: "me" | "all";
};

export default function HomeTabs({ tab }: Props) {
  return (
    <div className="flex flex-col">
      <Tabs
        aria-label="Review types"
        selectedKey={tab}
        variant="bordered"
        color="default"
        size="md"
      >
        <Tab key="me" title="My Reviews" href="/home?tab=me"></Tab>
        <Tab key="all" title="All reviews" href="/home?tab=all"></Tab>
      </Tabs>
    </div>
  );
}
