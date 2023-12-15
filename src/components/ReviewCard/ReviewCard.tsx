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

type Props = {
  review: ReviewsRecord;
};

export default function ReviewCard({ review }: Props) {
  return (
    <Card isPressable>
      <CardHeader className="flex gap-3">
        <div className="flex shrink-0 h-16 w-16 md:h-[150px] md:w-[150px]">
          <Image
            alt="Cigar image"
            className="object-cover rounded-full h-16 w-16 md:h-[150px] md:w-[150px]"
            src={review.images?.[0].url}
          />
        </div>
        <div className="flex">
          <p className="font-semibold">{review.cigar?.name}</p>
        </div>
      </CardHeader>

      <Divider />

      {/* <CardBody className="flex overflow-visible py-2">
            </CardBody>
            <Divider /> */}
      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-slate-500">Smoked on</span>
          <span className="text-sm font-semibold">
            {review.smokedOn.toLocaleString(undefined, {
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
