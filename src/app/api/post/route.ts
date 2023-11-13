import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import getFollowingPostsOf from "@/service/post";

export async function GET() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return new NextResponse('Authentication Error', { status: 401 })

  return getFollowingPostsOf(user.username as string).then(data => NextResponse.json(data))
}
