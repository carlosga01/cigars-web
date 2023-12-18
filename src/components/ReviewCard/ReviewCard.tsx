"use client";

import { ReviewsRecord } from "@/xata";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
} from "@nextui-org/react";
import { ReviewStars } from "..";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  reviewData: string;
};

export default function ReviewCard({ reviewData }: Props) {
  const router = useRouter();

  const [review, setReview] = useState<ReviewsRecord>();

  useEffect(() => {
    setReview(JSON.parse(reviewData) as ReviewsRecord);
  }, [reviewData]);

  if (!review) return null;

  return (
    <Card isPressable onPress={() => router.push(`/review/${review.id}`)}>
      <CardHeader className="flex gap-3">
        <div className="flex shrink-0 h-16 w-16 md:h-[150px] md:w-[150px]">
          <Image
            alt="Cigar image"
            className="object-cover rounded-full h-16 w-16 md:h-[150px] md:w-[150px]"
            src={review.images?.[0].url}
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
    </Card>
  );
}
