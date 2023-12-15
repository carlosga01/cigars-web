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
    <main className="min-h-screen flex items-center justify-center">
      <Image
        priority
        src={Background}
        alt="background"
        className="absolute w-full h-full object-cover"
      />
      <div className="text-white font-bold text-8xl z-10">Puros App</div>
    </main>
  );
}
