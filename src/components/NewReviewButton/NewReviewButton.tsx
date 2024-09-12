"use client";

import { useRouter } from "next/navigation";
import colors from "@/theme/colors";
import { Button } from "@nextui-org/react";

type Props = {
  text?: string;
};

export default function NewReviewButton({ text }: Props) {
  const router = useRouter();
  return (
    <Button
      variant="solid"
      color="primary"
      className="text-base"
      onClick={() => router.push("/create")}
    >
      {text ?? "New"}
    </Button>
  );
}
