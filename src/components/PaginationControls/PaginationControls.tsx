"use client";

import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import colors from "@/theme/colors";

type Props = {
  numRecords: string;
};

export default function PaginationControls({ numRecords }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "5";

  const onChangeValue = (page: number) => {
    router.push(`/home?page=${Number(page)}`);
  };

  return (
    <Pagination
      total={Math.ceil(Number(numRecords) / Number(pageSize))}
      initialPage={parseInt(page)}
      onChange={onChangeValue}
      color="warning"
    />
  );
}
