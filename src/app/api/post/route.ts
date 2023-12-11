import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import getFollowingPostsOf, { createPost } from "@/service/post";
import { withSessionUser } from "@/util/session";

export async function GET() {
  return withSessionUser(async user => {
    return getFollowingPostsOf(user.username as string).then(data => NextResponse.json(data))
  })
}

export async function POST(req: NextRequest) {
  return withSessionUser(async user => {
    const formData = await req.formData()
    const text = formData.get('text')?.toString()
    const file = formData.get('file') as Blob
    // console.log('route text: ', text, 'file:', file, 'formData: ', formData)

    if (!text || !file) return new NextResponse('Bad Request', { status: 400 })

    return createPost(user.id, text, file).then(data => NextResponse.json(data))
  })
}
