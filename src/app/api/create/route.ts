import { ReviewsRecord, getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { EditableData, Identifiable } from "@xata.io/client";
import { type NextRequest } from "next/server";

export type CreateReviewPayload = {
  reviewId?: string;
  cigarId: string;
  review: string;
  rating: number;
  imageFile?: File;
  imageBase64?: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateReviewPayload;

  const { userId } = auth();

  const client = getXataClient();
  const data = await client.db.reviews.create({
    rating: body.rating,
    reviewText: body.review,
    userId,
    images: [
      {
        name: body.imageFile?.name,
        mediaType: body.imageFile?.type,
        base64Content: body.imageBase64?.split(",")[1],
      },
    ],
    cigar: body.cigarId,
  } as Omit<EditableData<ReviewsRecord>, "id"> & Partial<Identifiable>);

  return Response.json({ data });
}

export async function PUT(request: NextRequest) {
  const body = (await request.json()) as CreateReviewPayload;

  const { userId } = auth();

  const client = getXataClient();

  if (!body.reviewId) {
    return Response.json({ error: "Review ID is required" }, { status: 400 });
  }

  let data;
  if (body.imageBase64) {
    data = await client.db.reviews.update({
      id: body.reviewId,
      rating: body.rating,
      reviewText: body.review,
      userId,
      images: [
        {
          name: body.imageFile?.name,
          mediaType: body.imageFile?.type,
          base64Content: body.imageBase64?.split(",")[1],
        },
      ],
      cigar: body.cigarId,
    } as EditableData<ReviewsRecord> & Partial<Identifiable>);
  } else {
    data = await client.db.reviews.update({
      id: body.reviewId,
      rating: body.rating,
      reviewText: body.review,
      userId,
      cigar: body.cigarId,
    } as EditableData<ReviewsRecord> & Partial<Identifiable>);
  }

  return Response.json({ data });
}
