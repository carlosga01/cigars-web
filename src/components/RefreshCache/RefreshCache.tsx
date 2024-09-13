"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  refresh?: boolean;
};

const RefreshCache: React.FC<Props> = ({ refresh }) => {
  const router = useRouter();

  useEffect(() => {
    if (!refresh) return;
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return null;
};

export default RefreshCache;
