"use client";

import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  numRecords: string;
};
export default function PaginationControls({ numRecords }: Props) {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "10";

  const onChangeValue = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.location.href = url.toString();
  };

  return (
    <Pagination
      total={Math.ceil(Number(numRecords) / Number(pageSize))}
      initialPage={parseInt(page)}
      onChange={onChangeValue}
      loop
      showControls
    />
  );
}
