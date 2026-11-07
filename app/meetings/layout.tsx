import Link from "next/link";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="border-b bg-blue-50 px-6 py-3 print:hidden">
        <div className="mx-auto max-w-6xl">
          <Link href="/meetings" className="font-medium text-blue-800 hover:underline">
            Meeting Programs
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
