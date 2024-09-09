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
      className="w-screen h-[100dvh] overflow-hidden relative"
      style={{ background: colors.background, marginTop: HEADER_NEGATIVE_MARGIN }}
    >
      <Image
        priority
        src={Background}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="opacity-25"
      />
      <div className="h-full flex flex-col gap-y-[1rem] items-center justify-center px-4">
        <div className="text-center">
          <h1
            className="font-bold text-4xl sm:text-5xl md:text-[4rem]"
            style={{ color: colors.primaryText }}
          >
            PUROS
          </h1>
          <p
            className="font-normal text-lg sm:text-xl md:text-[1.5rem]"
            style={{ color: colors.primaryText }}
          >
            A cigar log for cigar enthusiasts.
          </p>
        </div>
        <div className="flex justify-center gap-x-4">
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
