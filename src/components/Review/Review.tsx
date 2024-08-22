"use client";

import { ReviewsRecord } from "@/xata";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReviewStars from "../ReviewStars";
import colors from "@/theme/colors";

type Props = {
  review: string;
};

export default function Review({ review }: Props) {
  const router = useRouter();

  const [data, setData] = useState<ReviewsRecord>();

  useEffect(() => {
    setData(JSON.parse(review) as ReviewsRecord);
  }, [review]);

  if (!data) return null;

  return (
    <div className="container p-4 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-between w-full">
        <Button style={{ backgroundColor: colors.accentColor }} onPress={router.back}>
          Back
        </Button>
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
      {!!data.images?.length && (
        <Image
          src={data.images[0].url}
          alt="Cigar image"
          className="object-cover aspect-square w-3/4 m-auto mb-4 mt-2"
          disableSkeleton
        />
      )}
      <div className="flex flex-col mb-4">
        <ReviewStars rating={data.rating} starDimension="48" />
      </div>
      <div className="text-center" style={{ color: colors.primaryText }}>
        {data.reviewText}
      </div>
    </div>
  );
}
