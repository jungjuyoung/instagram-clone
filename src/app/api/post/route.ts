import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import getFollowingPostsOf, { createPost } from "@/service/post";

export async function GET() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return new NextResponse('Authentication Error', { status: 401 })

  return getFollowingPostsOf(user.username as string).then(data => NextResponse.json(data))
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return new NextResponse('Authentication Error', { status: 401 })

  const formData = await req.formData()
  const text = formData.get('text')?.toString()
  const file = formData.get('file') as Blob
  // console.log('route text: ', text, 'file:', file, 'formData: ', formData)

  if (!text || !file) return new NextResponse('Bad Request', { status: 400 })

  return createPost(user.id, text, file).then(data => NextResponse.json(data))
}
