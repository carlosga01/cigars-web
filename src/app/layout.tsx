import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components";
import { Providers } from "@/providers";
import colors from "@/theme/colors";
import { HEADER_HEIGHT } from "@/components/Header";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puros",
  description: "A cigar log for cigar enthusiasts.",
};

// <link rel="apple-touch-icon" href="/custom_icon.png"/>
// <link rel="apple-touch-startup-image" href="/startup.png">

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" className="overscroll-none">
          <head>
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={colors.background}
            />
            <meta name="theme-color" content={colors.background} />
            <title>Puros</title>
          </head>
          <body className={robotoFlex.className}>
            <Header />
            <div style={{ marginTop: HEADER_HEIGHT, backgroundColor: colors.background }}>
              {children}
            </div>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
