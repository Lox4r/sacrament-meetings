"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMeeting } from "@/lib/actions";

export default function DeleteMeetingButton({
  meetingId,
}: {
  meetingId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this meeting? This cannot be undone."
    );

    if (!confirmed) return;

    setError("");

    startTransition(async () => {
      try {
        await deleteMeeting(meetingId);
      } catch (error) {
        // Next.js redirect() throws a special control-flow error.
        // Let it propagate so successful navigation is not mistaken
        // for a failed deletion.
        if (
          error instanceof Error &&
          error.message === "NEXT_REDIRECT"
        ) {
          throw error;
        }

        console.error("Delete failed:", error);
        setError("Unable to delete the meeting.");
        router.refresh();
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded bg-red-700 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete Meeting"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
