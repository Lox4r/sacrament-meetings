export const instant = false;


import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";
import EditMeetingForm from "@/components/EditMeetingForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({
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
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Meeting
      </h1>

      <EditMeetingForm meeting={meeting} />
    </main>
  );
}

