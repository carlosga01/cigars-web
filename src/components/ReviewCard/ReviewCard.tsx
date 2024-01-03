"use client";

import { ReviewsRecord } from "@/xata";
import { Card, CardHeader, CardFooter, Image, Divider } from "@nextui-org/react";
import { ReviewStars } from "..";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

type Props = {
  reviewData: string;
};

export default function ReviewCard({ reviewData }: Props) {
  const router = useRouter();
  const { user } = useUser();

  const [review, setReview] = useState<ReviewsRecord>();
  const [reviewUser, setReviewUser] = useState<User>();

  useEffect(() => {
    setReview(JSON.parse(reviewData) as ReviewsRecord);
  }, [reviewData]);

  useEffect(() => {
    const getUser = async () => {
      if (!!review?.userId) {
        const u = await fetch(
          "/api/user?" +
            new URLSearchParams({
              userId: review.userId,
            }),
        );
        const u2 = await u.json();
        setReviewUser(u2.data as User);
      }
    };
    getUser();
  }, [review]);

  if (!review) return null;

  return (
    <Card isPressable onPress={() => router.push(`/review/${review.id}`)}>
      <CardHeader className="flex gap-3">
        <div className="flex shrink-0 h-16 w-16 md:h-[150px] md:w-[150px]">
          <Image
            alt="Cigar image"
            className="object-cover rounded-full h-16 w-16 md:h-[150px] md:w-[150px]"
            src={review.images?.[0]?.url}
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{review.cigar?.name}</p>
          <p className="font-normal text-sm md:line-clamp-4 line-clamp-1 italic text-slate-500">
            {review.reviewText}
          </p>
        </div>
      </CardHeader>

      <Divider />

      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-slate-500">Smoked on</span>
          <span className="text-sm font-semibold">
            {new Date(review.smokedOn).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-slate-500">
            Rating ({review.rating}){" "}
          </span>
          <ReviewStars rating={review.rating} />
        </div>
      </CardFooter>

      <Divider />
      <CardFooter className="flex flex-row justify-end">
        <div className="text-xs text-slate-400 italic me-2">Reviewed by</div>
        <Image alt="User image" src={reviewUser?.imageUrl} className="h-4 w-4" />
        <div className="text-xs text-slate-400 ms-2">
          {reviewUser?.id === user?.id
            ? "You"
            : reviewUser?.firstName + " " + reviewUser?.lastName?.[0] + "."}
        </div>
      </CardFooter>
    </Card>
  );
}
