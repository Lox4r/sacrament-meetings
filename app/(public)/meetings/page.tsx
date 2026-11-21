
import Link from "next/link";
import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import { getMeetings } from "@/lib/meetings-db";

export const instant = false;

interface PageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 5;

export default async function MeetingsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const query = (params.query ?? "").trim().toLowerCase();

  const requestedPage = Number(params.page ?? "1");
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const meetings = await getMeetings();

  const filteredMeetings = meetings.filter((meeting) => {
    const searchableText = [
      meeting.presiding,
      meeting.conducting,
      meeting.meetingType,
      ...(meeting.speakers ?? []).map(
        (speaker) => speaker.name ?? ""
      ),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMeetings.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const visibleMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  function pageUrl(targetPage: number) {
    const urlParams = new URLSearchParams();

    if (query) {
      urlParams.set("query", query);
    }

    urlParams.set("page", String(targetPage));

    return `/meetings?${urlParams.toString()}`;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-3 text-3xl font-bold text-gray-900">
        Sacrament Meetings
      </h1>

      <p className="mb-8 text-gray-600">
        View current and previous sacrament meeting programs.
      </p>

      <div className="mb-8">
        <Suspense
          fallback={
            <div className="rounded-lg border p-3 text-gray-500">
              Loading search...
            </div>
          }
        >
          <MeetingSearch />
        </Suspense>
      </div>

      <p className="mb-5 text-sm text-gray-600">
        Showing {visibleMeetings.length} of{" "}
        {filteredMeetings.length} meetings
      </p>

      {visibleMeetings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {visibleMeetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border p-6 text-gray-600">
          No meetings found.
        </p>
      )}

      <nav
        aria-label="Meeting pagination"
        className="mt-10 flex items-center justify-center gap-6"
      >
        {currentPage > 1 ? (
          <Link
            href={pageUrl(currentPage - 1)}
            className="rounded-lg border px-4 py-2 text-blue-600 hover:bg-gray-100"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-lg border px-4 py-2 text-gray-400">
            Previous
          </span>
        )}

        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages ? (
          <Link
            href={pageUrl(currentPage + 1)}
            className="rounded-lg border px-4 py-2 text-blue-600 hover:bg-gray-100"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-lg border px-4 py-2 text-gray-400">
            Next
          </span>
        )}
      </nav>
    </main>
  );
}
