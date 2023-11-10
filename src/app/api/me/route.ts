import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getUserByUsername } from "@/service/user";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return new NextResponse('Authentication Error', { status: 401 })

  return getUserByUsername(user.username as string).then(data => NextResponse.json(data))
}