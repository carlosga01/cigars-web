import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puros",
  description: "TODO",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={
            robotoFlex.className + " min-h-screen flex items-center justify-center"
          }
        >
          <Header />
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
