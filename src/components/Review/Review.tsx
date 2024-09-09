"use client";

import { ReviewsRecord } from "@/xata";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ReviewStars from "../ReviewStars";
import colors from "@/theme/colors";
import { Rating } from "@mui/material";

type Props = {
  review: string;
};

export default function Review({ review }: Props) {
  const [data, setData] = useState<ReviewsRecord>();

  useEffect(() => {
    setData(JSON.parse(review) as ReviewsRecord);
  }, [review]);

  if (!data) return null;

  return (
    <div className="p-4 flex flex-col items-center h-[100dvh]">
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
      {!!data.images?.length && (
        <Image
          src={data.images[0].url}
          alt="Cigar image"
          className="object-cover aspect-square w-3/4 m-auto mb-4 mt-2"
          disableSkeleton
        />
      )}
      <div className="flex flex-col mb-4">
        <Rating
          name="half-rating-read"
          defaultValue={data.rating}
          precision={0.5}
          className="self-center"
          readOnly
        />
      </div>
      <div className="text-center" style={{ color: colors.primaryText }}>
        {data.reviewText}
      </div>
    </div>
  );
}
