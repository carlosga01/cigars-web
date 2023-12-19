import { type NextRequest } from "next/server";
import { getXataClient } from "@/xata";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") ?? "";

  const xata = getXataClient();

  const data = await xata.db.cigars.search(query, {
    fuzziness: 1,
    prefix: "phrase",
  });

  return Response.json({ data });
}
