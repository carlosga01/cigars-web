"use client";

import { useAuth } from "@/hooks";
import Logo from "/public/images/puros.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const { push } = useRouter();

  return (
    <div className="flex gap-4 absolute top-0 z-50 p-6 justify-between w-full sm:justify-end">
      <Button variant="tertiary" text="Log in" onClick={() => push("/sign-in")} />
      <Button variant="primary" text="Get started" onClick={() => push("/sign-up")} />
    </div>
  );
}
