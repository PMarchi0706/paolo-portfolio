import { getNowPlaying } from "@/lib/spotify";

export const runtime = "nodejs";

export async function GET() {
  const data = await getNowPlaying();
  return Response.json(data);
}
