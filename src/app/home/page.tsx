import { ReviewStars } from "@/components";
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const client = getXataClient();
  const reviews = await client.db.reviews
    // .filter({ userId })
    .select(["*", "cigar.*"])
    .getMany();

  return (
    <div className="flex flex-1 flex-col align-center w-screen md:w-[48rem] px-4">
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            className="flex bg-slate-100 h-32 md:h-48 w-full border drop-shadow mb-4 rounded-xl overflow-hidden"
          >
            <div className="flex relative h-32 w-32 md:w-48 md:h-48 shrink-0">
              {review.images?.length && (
                <Image
                  src={review.images[0].url}
                  layout="fill"
                  objectFit="cover"
                  alt="cigar image"
                />
              )}
            </div>
            <div className="flex flex-col justify-between w-full pt-2 pl-2 md:pt-6 md:pl-6 pb-2 h-32 md:h-48">
              <div>
                <p className="font-semibold text-xl text-ellipsis overflow-hidden md:line-clamp-2 line-clamp-1 md:pr-6">
                  {review.cigar?.name}
                </p>
                <p className="text-sm text-slate-600 text-ellipsis overflow-hidden md:line-clamp-4 line-clamp-2 md:pr-6">
                  {review.reviewText}
                </p>
              </div>
              <div className="flex justify-end pr-2">
                <ReviewStars rating={review.rating} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
