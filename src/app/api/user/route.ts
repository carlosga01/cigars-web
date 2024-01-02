import { clerkClient } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("userId") ?? "";

  const data = await clerkClient.users.getUser(query);

  return Response.json({ data });
}
