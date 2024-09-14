"use client";

import { ReviewsRecord } from "@/xata";
import { Card, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";
import { getPriceAbbreviation } from "@/utils/price.util";

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

  const [userError, setUserError] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      if (!!review?.userId) {
        try {
          const u = await fetch(
            "/api/user?" +
              new URLSearchParams({
                userId: review.userId,
              }),
          );
          const u2 = await u.json();
          setReviewUser(u2.data as User);
          setUserError(false);
        } catch (e) {
          setUserError(true);
        }
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
        className="flex flex-row w-full p-2"
        onPress={() => router.push(`/review/${review.id}`)}
        shadow="sm"
      >
        <Image
          alt="Cigar image"
          className="object-cover h-[100px] w-[100px] flex-shrink-0 mr-2 rounded-lg"
          src={review.images?.[0]?.url}
          disableSkeleton
        />
        <div className="flex flex-1 flex-col p-2 h-[100px]">
          <div className="flex flex-row justify-between h-full">
            <div className="flex flex-col justify-start h-full">
              <p className="text-start overflow-hidden text-md font-bold line-clamp-2 leading-tight">
                {review.cigar?.name}
              </p>
            </div>
            {review.price && (
              <div className="font-bold text-success ms-2">
                {getPriceAbbreviation(review.price)}
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <Rating
              name="half-rating-read"
              defaultValue={review.rating}
              precision={0.5}
              className="self-center"
              readOnly
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "rgba(255, 255, 255, 0.25)",
                },
              }}
            />

            <div className="flex flex-col gap-1">
              <div className="flex flex-row justify-end">
                <Image alt="User image" src={reviewUser?.imageUrl} className="h-4 w-4" />
                <div className="text-xs ms-2 opacity-75">
                  {!!userError
                    ? null
                    : !user || !reviewUser
                      ? "Loading..."
                      : reviewUser?.id === user?.id
                        ? "You"
                        : reviewUser?.firstName + " " + reviewUser?.lastName?.[0] + "."}
                </div>
              </div>
              <p className="text-xs italic self-end opacity-75">
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
