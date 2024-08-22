"use client";

import { ReviewsRecord } from "@/xata";
import { Card, CardHeader, CardFooter, Image, Divider } from "@nextui-org/react";
import { ReviewStars } from "..";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import colors from "@/theme/colors";

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
    <Card
      isPressable
      style={{
        backgroundColor: colors.secondaryBackground,
      }}
      className="flex flex-row"
      onPress={() => router.push(`/review/${review.id}`)}
    >
      <Image
        alt="Cigar image"
        className="object-cover  h-[50vw] w-[50vw] md:h-[150px] md:w-[150px]"
        src={review.images?.[0]?.url}
        disableSkeleton
      />
      <div className="flex flex-1 flex-col p-4 h-[50vw]" style={{ width: "100%" }}>
        <div className="flex flex-col flex-1">
          <p className="text-center" style={{ color: colors.primaryText }}>
            {review.cigar?.name}
          </p>
          <ReviewStars rating={review.rating} starDimension="6vw" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row justify-end">
            <Image alt="User image" src={reviewUser?.imageUrl} className="h-4 w-4" />
            <div className="text-xs ms-2" style={{ color: colors.primaryText }}>
              {reviewUser?.id === user?.id
                ? "You"
                : reviewUser?.firstName + " " + reviewUser?.lastName?.[0] + "."}
            </div>
          </div>
          <p className="text-xs italic self-end" style={{ color: colors.primaryText }}>
            {new Date(review.smokedOn).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/*<CardHeader className="flex gap-3">*/}
      {/*  <div className="flex shrink-0 h-16 w-16 md:h-[150px] md:w-[150px]">*/}
      {/*    <Image*/}
      {/*      alt="Cigar image"*/}
      {/*      className="object-cover rounded-full h-16 w-16 md:h-[150px] md:w-[150px]"*/}
      {/*      src={review.images?.[0]?.url}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col">*/}
      {/*    <p className="font-semibold">{review.cigar?.name}</p>*/}
      {/*    <p className="font-normal text-sm md:line-clamp-4 line-clamp-1 italic text-slate-500">*/}
      {/*      {review.reviewText}*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*</CardHeader>*/}

      {/*<Divider />*/}
    </Card>
  );
}
