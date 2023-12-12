import Image from "next/image";

import Background from "/public/images/landing/background.jpg";
import { Header } from "@/components";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24">
      <Header />
      <Image
        priority
        src={Background}
        alt="background"
        className="absolute w-full h-full object-cover opacity-25"
      />
      <div className="text-white font-bold text-8xl z-10">Puros</div>
    </main>
  );
}
