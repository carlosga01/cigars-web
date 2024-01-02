import { HomeTabs, NewReviewButton, PaginationControls, ReviewCard } from "@/components";
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string; tab?: "me" | "all" };
}) {
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "5";
  const tab = searchParams.tab ?? "all";

  const { userId } = auth();
  const client = getXataClient();

  if (!userId) {
    redirect("/");
  }

  const reviews = await client.db.reviews
    .select(["*", "cigar.*"])
    .filter(tab === "me" ? { userId } : {})
    .sort("smokedOn", "desc")
    .getPaginated({
      pagination: {
        size: parseInt(pageSize),
        offset: (parseInt(page) - 1) * parseInt(pageSize),
      },
    });

  const numReviews = await client.db.reviews.summarize({
    summaries: { all_reviews: { count: "*" } },
    filter: { userId },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center justify-between w-full md:w-[600px] pt-4 px-4">
        <h1 className="text-start font-bold text-xl">Your Smokes</h1>
        <NewReviewButton />
      </div>
      <HomeTabs tab={tab} />
      <div className="flex flex-col gap-2 w-full md:w-[600px] p-4 mb-24">
        {reviews.records.map((review) => {
          return <ReviewCard key={review.id} reviewData={JSON.stringify(review)} />;
        })}
        <div className="flex justify-center w-full md:w-[600px] px-4 pt-4">
          <PaginationControls
            numRecords={numReviews.summaries[0].all_reviews.toString()}
          />
        </div>
      </div>
    </div>
  );
}
