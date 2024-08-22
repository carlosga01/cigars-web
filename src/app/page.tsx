import Image from "next/image";

import Background from "/public/images/landing/background.jpg";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import colors from "@/theme/colors";

export default function LandingPage() {
  const { userId } = auth();

  if (userId) {
    redirect("/home");
  }

  return (
    <main
      className="relative flex items-center justify-center max-h-screen"
      style={{ marginTop: -60, background: colors.background }}
    >
      <Image
        priority
        src={Background}
        alt="background"
        className="w-full h-screen object-cover opacity-25"
      />
      <div className="absolute">
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
          Your personal cigar journal.
        </p>
      </div>
    </main>
  );
}
