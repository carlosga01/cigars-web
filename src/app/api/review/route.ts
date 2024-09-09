import { ReviewsRecord, getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reviewId = searchParams.get("reviewId") ?? "";

  if (!reviewId) {
    return Response.json({});
  }

  const client = getXataClient();
  const data = (await client.db.reviews
    .select(["*", "cigar.*"])
    .filter({ id: reviewId })
    .getFirst()) as ReviewsRecord;

  return Response.json({ data });
}
