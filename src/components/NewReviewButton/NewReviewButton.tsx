"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  text?: string;
};

export default function NewReviewButton({ text = "New" }: Props) {
  const router = useRouter();
  return (
    <Button color="primary" onPress={() => router.push("/create")}>
      {text}
    </Button>
  );
}
