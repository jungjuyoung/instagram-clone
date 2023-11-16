import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { getPost } from "@/service/post";
import { authOptions } from "../../auth/[...nextauth]/route";

type Context = {
  params: { id: string }
}
export async function GET(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return new NextResponse('Authentication Error', { status: 401 })

  return getPost(context.params.id)//
    .then(data => NextResponse.json(data))
}
