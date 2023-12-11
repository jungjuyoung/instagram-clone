import { NextRequest, NextResponse } from "next/server";
import { disLikePost, likePost } from "@/service/post";
import { withSessionUser } from "@/util/session";

export async function PUT(req: NextRequest) {
  return withSessionUser(async user => {
    const { id, liked } = await req.json();
    if (!id || liked == null) {
      return new NextResponse('Bad request', { status: 400 })
    }

    const request = liked ? likePost : disLikePost
    return request(id, user.id).then(res => NextResponse.json(res)).catch(err => new NextResponse(JSON.stringify(err), { status: 500 }))
  })
}