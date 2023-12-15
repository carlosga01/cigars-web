import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components";
import { Providers } from "@/providers";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puros",
  description: "TODO",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={robotoFlex.className + " min-h-screen"}>
            <Header />
            <div>{children}</div>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
