"use client";

import ReactStars from "react-star-ratings";

type Props = {
  rating: number;
  changeRating?: (rating: number) => void;
  starDimension?: string;
};

export default function ReviewStars({
  rating,
  changeRating,
  starDimension = "24px",
}: Props) {
  return (
    <ReactStars
      numberOfStars={5}
      rating={rating}
      starDimension={starDimension}
      starSpacing="0px"
      starRatedColor="#FFDF00"
      starHoverColor="#FFDF00"
      changeRating={changeRating}
    />
  );
}
