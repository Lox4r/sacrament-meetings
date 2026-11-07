
import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  const meetings = getMeetings();

  if (date) {
    return NextResponse.json(
      meetings.filter((meeting) => meeting.date === date)
    );
  }

  return NextResponse.json(meetings);
}
