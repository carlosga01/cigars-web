import { HomeTabs, NewReviewButton, PaginationControls, ReviewCard } from "@/components";
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { Spinner } from "@nextui-org/react";

import { redirect } from "next/navigation";
import colors from "@/theme/colors";
import React from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string; tab?: "me" | "all" };
}) {
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "10";
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
    filter: tab === "me" ? { userId } : {},
  });

  return (
    <div
      className="flex flex-col items-center gap-1 w-full min-h-[100dvh] px-3 pt-3 pb-16"
      style={{
        backgroundColor: colors.black,
      }}
    >
      <div className="flex flex-row justify-evenly w-full items-center">
        <HomeTabs tab={tab} />
        <NewReviewButton />
      </div>
      {!!reviews.records.length ? (
        <>
          {reviews.records.reduce((acc, review, index, array) => {
            const currentDate = new Date(review.smokedOn);
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            if (
              index === 0 ||
              currentMonth !== new Date(array[index - 1].smokedOn).getMonth() ||
              currentYear !== new Date(array[index - 1].smokedOn).getFullYear()
            ) {
              acc.push(
                <div
                  key={`${currentDate.toLocaleString("default", {
                    month: "long",
                  })}-${currentYear}`}
                  className="w-full font-bold mt-2 ms-4 italic"
                  style={{ color: colors.primaryText }}
                >
                  {`${currentDate.toLocaleString("default", {
                    month: "long",
                  })} ${currentYear}`}
                </div>,
              );
            }

            acc.push(<ReviewCard reviewData={JSON.stringify(review)} index={index} />);
            return acc;
          }, [] as React.JSX.Element[])}
        </>
      ) : reviews.records.length === 0 ? (
        <div className="flex flex-col gap-4 mt-8 items-center">
          <div className="text-md text-center text-slate-600">
            You have not reviewed any cigars yet
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!!reviews.records.length && (
        <div className="flex justify-center w-full md:w-[600px] px-4 pt-4">
          <PaginationControls
            numRecords={numReviews.summaries[0].all_reviews.toString()}
          />
        </div>
      )}
    </div>
  );
}
