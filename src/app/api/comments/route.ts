import { NextRequest, NextResponse } from "next/server";
import { addComment } from "@/service/post";
import { withSessionUser } from "@/util/session";

export async function POST(req: NextRequest) {
  return withSessionUser(async user => {
    const { id, comment } = await req.json();

    if (!id || comment == null) {
      return new NextResponse('Bad request', { status: 400 })
    }

    return addComment(id, user.id, comment).then(res => NextResponse.json(res)).catch(err => new NextResponse(JSON.stringify(err), { status: 500 }))
  })
}