import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { getPost } from "@/service/post";
import { authOptions } from "../../auth/[...nextauth]/route";
import { withSessionUser } from "@/util/session";

type Context = {
  params: { id: string }
}
export async function GET(req: NextRequest, context: Context) {
  return withSessionUser(async user => {
    return getPost(context.params.id)//
      .then(data => NextResponse.json(data))
  })
}
