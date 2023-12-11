import { NextRequest, NextResponse } from "next/server";
import { removeBookmark, addBookmark } from "@/service/user";
import { withSessionUser } from "@/util/session";

export async function PUT(req: NextRequest) {
  return withSessionUser(async user => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark == null) {
      return new NextResponse('Bad request', { status: 400 })
    }

    const request = bookmark ? addBookmark : removeBookmark
    return request(id, user.id).then(res => NextResponse.json(res)).catch(err => new NextResponse(JSON.stringify(err), { status: 500 }))
  })
}