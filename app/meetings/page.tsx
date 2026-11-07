
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";
import { headers } from "next/headers";

export const instant = false;

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const headerStore = await headers();
  const host = headerStore.get("host");

  if (!host) {
    throw new Error("Unable to determine the application host");
  }

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(
    `${protocol}://${host}/api/meetings`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to load meetings");
  }

  return (await response.json()) as SacramentMeeting[];
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-3 text-3xl font-bold text-gray-900">
        Sacrament Meetings
      </h1>

      <p className="mb-8 text-gray-600">
        View current and previous sacrament meeting programs.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </main>
  );
}
