import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header, ScrollToTop } from "@/components";
import { Providers } from "@/providers";
import colors from "@/theme/colors";
import { HEADER_HEIGHT } from "@/components/Header";
import { GoogleAnalytics } from "@next/third-parties/google";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puros",
  description: "A cigar log for cigar enthusiasts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" className="overscroll-none dark">
          <head>
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={colors.background}
            />
            <meta name="theme-color" content={colors.background} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <title>Puros</title>
          </head>
          <GoogleAnalytics gaId="G-6KTQR95BD1" />
          <body className={robotoFlex.className}>
            <Header />
            <div style={{ marginTop: HEADER_HEIGHT, backgroundColor: colors.background }}>
              {children}
            </div>
            <ScrollToTop />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
