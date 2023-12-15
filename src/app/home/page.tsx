import { ReviewCard } from "@/components";
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { Pagination } from "@nextui-org/react";

export default async function HomePage() {
  const { userId } = auth();
  const client = getXataClient();

  const reviews = await client.db.reviews.select(["*", "cigar.*"]).getPaginated({
    pagination: { size: 5, offset: 0 },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-2 w-full md:w-[600px] p-4 md:p-0">
        {reviews.records.map((review) => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </div>
      <Pagination initialPage={1} total={10} className="my-4" />
    </div>
  );
}
