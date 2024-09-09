import { SignIn } from "@clerk/nextjs";
import colors from "@/theme/colors";
import { HEADER_NEGATIVE_MARGIN } from "@/components/Header";

export default function Page() {
  return (
    <div
      className="flex items-center justify-center h-[100dvh]"
      style={{
        marginTop: HEADER_NEGATIVE_MARGIN,
        background: colors.secondaryBackground,
      }}
    >
      <SignIn />
    </div>
  );
}
