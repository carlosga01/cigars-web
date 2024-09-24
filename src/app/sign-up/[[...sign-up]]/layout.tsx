import { GoogleAnalytics } from "@next/third-parties/google";

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAnalytics gaId="G-6KTQR95BD1" />
      {children}
    </>
  );
}
