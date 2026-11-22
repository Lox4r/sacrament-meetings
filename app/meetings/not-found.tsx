import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl p-8 text-center">
      <h1 className="mb-4 text-3xl font-bold">
        Meeting Not Found
      </h1>

      <p className="mb-6">
        The meeting you requested does not exist
        or may have been deleted.
      </p>

      <Link
        href="/meetings"
        className="rounded bg-blue-700 px-4 py-2 text-white"
      >
        Back to Meetings
      </Link>
    </main>
  );
}
