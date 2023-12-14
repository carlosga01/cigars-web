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
      starDimension="32px"
      starSpacing="0px"
    />
  );
}
