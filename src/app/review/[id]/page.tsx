import { Review } from "@/components";
import colors from "@/theme/colors";
import { ReviewsRecord, getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ReviewPage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const client = getXataClient();

  const id = params.id as string;

  if (!userId) {
    redirect("/");
  }

  if (!id) {
    redirect("/home");
  }

  const data = (await client.db.reviews
    .select(["*", "cigar.*"])
    .filter({ id })
    .getFirst()) as ReviewsRecord;

  return (
    <div
      className="w-full pb-12"
      style={{
        backgroundColor: colors.black,
      }}
    >
      <Review review={JSON.stringify(data)} />
    </div>
  );
}
