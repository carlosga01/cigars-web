"use client";

import { ReviewsRecord } from "@/xata";
import { Card, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";

type Props = {
  reviewData: string;
  index: number;
};

export default function ReviewCard({ reviewData, index }: Props) {
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
    <motion.div
      key={review.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="w-full"
    >
      <Card
        isPressable
        className="flex flex-row w-full"
        onPress={() => router.push(`/review/${review.id}`)}
      >
        <Image
          alt="Cigar image"
          className="object-cover h-[100px] w-[100px] flex-shrink-0 mr-2"
          src={review.images?.[0]?.url}
          disableSkeleton
        />
        <div className="flex flex-1 flex-col p-2 pt-4 h-[100px] overflow-hidden justify-between">
          <p className="text-start text-ellipsis overflow-hidden whitespace-nowrap text-md pe-2">
            {review.cigar?.name}
          </p>
          <div className="flex flex-row justify-between">
            <Rating
              name="half-rating-read"
              defaultValue={review.rating}
              precision={0.5}
              className="self-center"
              readOnly
            />

            <div className="flex flex-col gap-1">
              <div className="flex flex-row justify-end">
                <Image alt="User image" src={reviewUser?.imageUrl} className="h-4 w-4" />
                <div className="text-xs ms-2">
                  {!user || !reviewUser
                    ? "Loading..."
                    : reviewUser?.id === user?.id
                      ? "You"
                      : reviewUser?.firstName + " " + reviewUser?.lastName?.[0] + "."}
                </div>
              </div>
              <p className="text-xs italic self-end">
                {new Date(review.smokedOn).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
