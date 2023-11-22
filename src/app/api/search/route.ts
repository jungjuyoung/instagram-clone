import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET(_req: NextRequest) {
  return searchUsers()//
    .then(data => NextResponse.json(data))
}
