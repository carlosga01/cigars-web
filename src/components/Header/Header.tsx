"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/base";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { user, isLoaded } = useUser();
  const { push } = useRouter();

  return (
    <header className="flex items-center gap-4 h-20 absolute top-0 z-50 p-4 justify-between w-full sm:justify-end">
      {isLoaded && user ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <>
          <Button variant="tertiary" text="Log in" onClick={() => push("/sign-in")} />
          <Button variant="primary" text="Get started" onClick={() => push("/sign-up")} />
        </>
      )}
    </header>
  );
}
