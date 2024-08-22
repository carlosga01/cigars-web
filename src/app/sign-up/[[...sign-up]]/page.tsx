import { SignUp } from "@clerk/nextjs";
import colors from "@/theme/colors";

export default function Page() {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: colors.secondaryBackground,
      }}
    >
      <SignUp />
    </div>
  );
}
