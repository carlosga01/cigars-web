"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  tab?: "me" | "all";
};

export default function HomeTabs({ tab }: Props) {
  const router = useRouter();

  return (
    <div className="flex px-4 pt-4 w-full flex-row justify-items-start">
      {tab === "me" ? (
        <Button
          variant="flat"
          color="secondary"
          onPress={() => router.push("/home?tab=all")}
        >
          See All Reviews
        </Button>
      ) : (
        <Button
          variant="flat"
          color="secondary"
          onPress={() => router.push("/home?tab=me")}
        >
          See My Reviews
        </Button>
      )}
    </div>
  );
}
