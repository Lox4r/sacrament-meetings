"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Meeting page error:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-xl p-8 text-center">
      <h1 className="mb-4 text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mb-6">
        We could not load the meeting information.
        Please try again.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded bg-blue-700 px-4 py-2 text-white"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded border px-4 py-2"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}
