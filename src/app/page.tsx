import Image from "next/image";

import Background from "/public/images/landing/background.jpg";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import colors from "@/theme/colors";
import { Button, Link } from "@nextui-org/react";
import { HEADER_NEGATIVE_MARGIN } from "@/components/Header";
import Puros from "/public/images/puros-white.png";

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
        className="opacity-25 z-0"
      />

      <div className="h-full flex flex-col gap-y-[1rem] items-center justify-center px-4 z-10 relative">
        <div className="text-center">
          <Image
            alt="Puros"
            src={Puros}
            style={{
              width: "75vw",
              aspectRatio: "2.75",
              objectFit: "contain",
              height: "auto",
            }}
          />
          <p
            className="font-normal text-lg sm:text-xl md:text-[1.5rem]"
            style={{ color: colors.primaryText }}
          >
            The cigar app
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
              fontWeight: "bold",
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
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </main>
  );
}
