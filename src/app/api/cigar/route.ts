import { ReviewsRecord, getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { EditableData, Identifiable } from "@xata.io/client";
import { type NextRequest } from "next/server";

export type CreateCigarPayload = {
  name: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateCigarPayload;

  const client = getXataClient();
  const data = await client.db.cigars.create({
    name: body.name,
    country: "null",
    manufacturer: "null",
  });
  return Response.json({ data });
}
