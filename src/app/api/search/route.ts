import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { keyword: string }
}
export async function GET(_req: NextRequest, context: Context) {
  return searchUsers()//
    .then(data => NextResponse.json(data))
}
