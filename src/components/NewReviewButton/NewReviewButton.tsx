"use client";

import { useRouter } from "next/navigation";
import colors from "@/theme/colors";
import { Button } from "../base";

type Props = {
  text?: string;
};

export default function NewReviewButton({ text }: Props) {
  const router = useRouter();
  return (
    <Button
      text={text ?? "New review"}
      className="w-full"
      style={{ backgroundColor: colors.accentColor }}
      onClick={() => router.push("/create")}
    />
  );
}
