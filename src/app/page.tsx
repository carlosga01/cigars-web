import Image from "next/image";

import Background from "/public/images/landing/background.jpg";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function LandingPage() {
  const { userId } = auth();
  if (userId) {
    redirect("/home");
  }

  return (
    <main className="relative flex items-center justify-center max-h-screen">
      <Image
        priority
        src={Background}
        alt="background"
        className="w-full h-screen object-cover"
      />
    </main>
  );
}
