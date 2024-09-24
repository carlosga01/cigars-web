import { GoogleAnalytics } from "@next/third-parties/google";

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAnalytics gaId="G-6KTQR95BD1" />
      {children}
    </>
  );
}
