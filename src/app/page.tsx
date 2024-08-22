import Image from "next/image";

import Background from "/public/images/landing/background.jpg";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import colors from "@/theme/colors";
import { Button, Link } from "@nextui-org/react";
import { HEADER_NEGATIVE_MARGIN } from "@/components/Header";

export default function LandingPage() {
  const { userId } = auth();

  if (userId) {
    redirect("/home");
  }

  return (
    <main
      className="relative flex items-center justify-center max-h-screen"
      style={{ marginTop: HEADER_NEGATIVE_MARGIN, background: colors.background }}
    >
      <Image
        priority
        src={Background}
        alt="background"
        className="w-full h-screen object-cover opacity-25"
      />
      <div className="flex flex-col	 gap-y-[1rem] absolute">
        <div>
          <h1
            className="font-bold text-center text-[4rem]"
            style={{ color: colors.primaryText }}
          >
            PUROS
          </h1>
          <p
            className="font-normal text-center text-[1.5rem]"
            style={{ color: colors.primaryText }}
          >
            Everything cigars.
          </p>
        </div>
        <div className="flex justify-center gap-x-[1rem]">
          <Button
            as={Link}
            href="/sign-in"
            variant="flat"
            style={{
              color: colors.primaryText,
              backgroundColor: colors.secondaryBackground,
            }}
          >
            Sign In
          </Button>
          <Button
            as={Link}
            href="/sign-up"
            variant="flat"
            style={{
              color: colors.black,
              backgroundColor: colors.accentColor,
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </main>
  );
}
