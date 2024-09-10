"use client";

import { ReviewsRecord } from "@/xata";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import colors from "@/theme/colors";
import { Rating } from "@mui/material";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = {
  review: string;
};

export default function Review({ review }: Props) {
  const router = useRouter();

  const { user } = useUser();
  const [data, setData] = useState<ReviewsRecord>();
  const [reviewUser, setReviewUser] = useState<User>();

  useEffect(() => {
    setData(JSON.parse(review) as ReviewsRecord);
  }, [review]);

  useEffect(() => {
    const getUser = async () => {
      if (!!data?.userId) {
        const u = await fetch(
          "/api/user?" +
            new URLSearchParams({
              userId: data.userId,
            }),
        );
        const u2 = await u.json();
        setReviewUser(u2.data as User);
      }
    };
    getUser();
  }, [data?.userId, review]);

  if (!data) return null;

  return (
    <div
      className="p-4 flex flex-col items-center h-[100dvh]"
      style={{
        backgroundColor: colors.black,
      }}
    >
      <div className="flex flex-row justify-between w-full">
        <Button
          onClick={() => router.back()}
          variant="solid"
          className="self-start"
          color="primary"
        >
          Back
        </Button>
        {user?.id === reviewUser?.id && (
          <Button
            variant="flat"
            color="warning"
            onClick={() => {
              router.push(`/create/?reviewId=${data.id}&mode=edit`);
            }}
          >
            Edit
          </Button>
        )}
      </div>
      <div
        className="text-center m-2 font-bold text-xl"
        style={{ color: colors.primaryText }}
      >
        {data.cigar?.name}
      </div>
      {!!data.cigar?.manufacturer && data.cigar.manufacturer != "null" && (
        <div
          className="text-center mb-4 mt-1 italic text-sm"
          style={{ color: colors.primaryText }}
        >
          {data.cigar?.manufacturer}
        </div>
      )}
      <div className="flex flex-row items-center mb-4 gap-2">
        <Rating
          name="half-rating-read"
          defaultValue={data.rating}
          precision={0.5}
          className="self-center"
          readOnly
        />
        <div className="flex flex-row justify-end">
          <Image alt="User image" src={reviewUser?.imageUrl} className="h-4 w-4" />
          <div className="text-xs ms-2" style={{ color: colors.primaryText }}>
            {!user || !reviewUser
              ? null
              : reviewUser?.id === user?.id
                ? "You"
                : reviewUser?.firstName + " " + reviewUser?.lastName?.[0] + "."}
          </div>
        </div>
      </div>
      {!!data.images?.length && (
        <Image
          src={data.images[0].url}
          alt="Cigar image"
          className="object-cover aspect-square w-3/4 m-auto mb-4 mt-2"
          disableSkeleton
        />
      )}
      <div className="text-center" style={{ color: colors.primaryText }}>
        {data.reviewText}
      </div>
    </div>
  );
}
