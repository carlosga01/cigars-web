"use client";

import ReactStars from "react-star-ratings";

type Props = {
  rating: number;
};

export default function ReviewStars({ rating }: Props) {
  return (
    <ReactStars
      numberOfStars={5}
      rating={rating}
      starDimension="24px"
      starSpacing="0px"
      starRatedColor="#FFDF00"
    />
  );
}
