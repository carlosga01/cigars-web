"use client";

import { ReviewsRecord } from "@/xata";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReviewStars from "../ReviewStars";

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
    <div className="container px-4 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-between w-full">
        <Button color="primary" variant="flat" onPress={router.back}>
          Back
        </Button>
      </div>
      <div className="text-center m-2 mb-1 font-bold text-xl">{data.cigar?.name}</div>
      <div className="text-center mb-4 italic text-slate-500 text-sm">
        {data.cigar?.manufacturer}
      </div>
      {!!data.images?.length && (
        <Image
          src={data.images[0].url}
          alt="Cigar image"
          className="object-cover rounded-full aspect-square w-3/4 m-auto mb-4"
        />
      )}
      <div className="flex flex-col mb-4">
        <ReviewStars rating={data.rating} starDimension="48" />
      </div>
      <div className="text-center text-slate-700">{data.reviewText}</div>
    </div>
  );
}
