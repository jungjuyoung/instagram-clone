import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";
type Context = {
  params: {
    tab: string[] //tab/tab/tab
  }
}
export async function GET(_: NextRequest, context: Context) {
  const { tab } = context.params;

  if (!tab || !Array.isArray(tab) || tab.length < 2) {
    return new NextResponse('Bad Request', { status: 400 })
  }
  const [username, query] = tab;

  let request = getPostsOf;
  if (query === 'saved') request = getSavedPostsOf;
  if (query === 'likes') request = getLikedPostsOf;
  return request(username).then(data => NextResponse.json(data))

}