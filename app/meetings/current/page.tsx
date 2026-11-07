import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  // Wait for a request before calculating the date.
  await connection();

  const today = new Date();
  const sunday = new Date(today);

  // Find the most recent Sunday.
  sunday.setDate(today.getDate() - today.getDay());

  const sundayDate = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");

  // Find the latest recorded meeting on or before Sunday.
  const meeting = [...getMeetings()]
    .filter((item) => item.date <= sundayDate)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  redirect("/meetings");
}
