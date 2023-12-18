"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NewReviewButton() {
  const router = useRouter();
  return (
    <Button color="primary" onPress={() => router.push("/create")}>
      New
    </Button>
  );
}
