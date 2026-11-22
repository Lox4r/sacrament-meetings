
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import { getMeetingById } from "@/lib/meetings-db";

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({
  params,
}: PageProps) {
  await connection();

  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isSafeInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 print:max-w-none print:p-0">
      <div className="mb-6 print:hidden">
        <Link
          href="/meetings"
          className="font-medium text-blue-500 hover:underline"
        >
          â† Back to Meetings
        </Link>
      </div>

      <MeetingDetail meeting={meeting} />

      <div className="mt-6 print:hidden">
        <PrintButton />
      </div>
    </main>
  );
}

