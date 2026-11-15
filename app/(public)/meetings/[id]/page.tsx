
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import type { SacramentMeeting } from "@/lib/types";

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const headerStore = await headers();
  const host = headerStore.get("host");

  if (!host) {
    throw new Error("Unable to determine the application host");
  }

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(
    `${protocol}://${host}/api/meetings/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );

  if (response.status === 404 || response.status === 400) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load meeting");
  }

  return (await response.json()) as SacramentMeeting;
}

export default async function MeetingPage({ params }: PageProps) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);

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
          ← Back to Meetings
        </Link>
      </div>

      <MeetingDetail meeting={meeting} />

      <div className="mt-6 print:hidden">
        <PrintButton />
      </div>
    </main>
  );
}

