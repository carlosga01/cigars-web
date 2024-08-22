"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import colors from "@/theme/colors";

type Props = {
  text?: string;
};

export default function NewReviewButton({ text = "New" }: Props) {
  const router = useRouter();
  return (
    <Button
      style={{
        background: colors.accentColor,
        color: colors.black,
      }}
      onPress={() => router.push("/create")}
    >
      {text}
    </Button>
  );
}
