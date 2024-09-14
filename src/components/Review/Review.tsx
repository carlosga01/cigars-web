"use client";

import { ReviewsRecord } from "@/xata";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import colors from "@/theme/colors";
import { Rating } from "@mui/material";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getPriceAbbreviation } from "@/utils/price.util";

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

  const [userError, setUserError] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      if (!!data?.userId) {
        try {
          const u = await fetch(
            "/api/user?" +
              new URLSearchParams({
                userId: data.userId,
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
  }, [data?.userId, review]);

  if (!data) return null;

  return (
    <div className="p-3 flex flex-col m-auto gap-4 md:max-w-[500px]">
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
      <div>
        <div
          className="text-center font-bold text-2xl leading-tight"
          style={{ color: colors.primaryText }}
        >
          {data.cigar?.name}
        </div>
      </div>
      {!!data.images?.length && (
        <Image
          src={data.images[0].url}
          alt="Cigar image"
          className="object-cover aspect-square w-full"
          disableSkeleton
        />
      )}
      {!!data.cigar?.manufacturer && data.cigar.manufacturer != "null" && (
        <div className="flex flex-col self-start">
          <div className="self-start text-base font-bold opacity-50">Manufacturer</div>
          <div className="" style={{ color: colors.primaryText }}>
            {data.cigar?.manufacturer}
          </div>
        </div>
      )}

      <div className="flex flex-col self-start">
        <div className="self-start text-base font-bold opacity-50">
          Rating ({data.rating})
        </div>
        <Rating
          name="half-rating-read"
          defaultValue={data.rating}
          precision={0.5}
          readOnly
          size="large"
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "rgba(255, 255, 255, 0.25)",
            },
          }}
        />
      </div>
      <div className="flex flex-col self-start">
        <div className="self-start text-base font-bold opacity-50">Review</div>
        <div className="leading-tight" style={{ color: colors.primaryText }}>
          {data.reviewText}
        </div>
      </div>
      {!!data.price && (
        <div className="flex flex-col self-start">
          <div className="self-start text-base font-bold opacity-50">Price</div>
          <div className="leading-tight" style={{ color: colors.primaryText }}>
            <span className="font-bold text-success">
              {getPriceAbbreviation(data.price)}
            </span>{" "}
            &ndash; ${data.price.toFixed(2)}
          </div>
        </div>
      )}
      <div className="flex flex-col self-start">
        <div className="flex flex-row items-center justify-center">
          <Image
            alt="User image"
            src={reviewUser?.imageUrl}
            className="h-[50px] w-[50px] rounded-full"
          />
          <div className="text-base ms-2" style={{ color: colors.primaryText }}>
            {!!userError
              ? null
              : !user || !reviewUser
                ? "Loading..."
                : reviewUser?.id === user?.id
                  ? "You"
                  : reviewUser?.firstName + " " + reviewUser?.lastName?.[0] + "."}
          </div>
        </div>
      </div>
    </div>
  );
}
