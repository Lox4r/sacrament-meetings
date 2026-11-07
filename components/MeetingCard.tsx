
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-900">
          {formattedDate}
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm capitalize text-blue-800">
          {meeting.meetingType}
        </span>
      </div>

      <p className="mb-2 text-gray-600">
        <strong>Presiding:</strong> {meeting.presiding}
      </p>

      <p className="mb-4 text-gray-600">
        <strong>Conducting:</strong> {meeting.conducting}
      </p>

      <Link
        href={`/meetings/${meeting.id}`}
        className="inline-block rounded-lg bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        View Meeting Details
      </Link>
    </article>
  );
}
