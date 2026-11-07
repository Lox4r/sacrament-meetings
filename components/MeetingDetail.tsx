
import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const date = new Date(`${meeting.date}T12:00:00`).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <article className="rounded-xl bg-white p-6 text-gray-900 shadow-md print:rounded-none print:p-0 print:shadow-none">
      <header className="mb-6 border-b pb-4 text-center">
        <h1 className="text-3xl font-bold">Sacrament Meeting</h1>
        <p className="mt-2 text-gray-600">{date}</p>
        <p className="mt-1 capitalize">{meeting.meetingType} Meeting</p>
      </header>

      <div className="space-y-5">
        <section>
          <h2 className="text-xl font-semibold">Leadership</h2>
          <p>Presiding: {meeting.presiding}</p>
          <p>Conducting: {meeting.conducting}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Announcements</h2>
          {meeting.announcements?.length ? (
            <ul className="list-disc pl-6">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          ) : (
            <p>No announcements.</p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold">Opening</h2>
          <p>
            Opening Hymn: #{meeting.openingHymn.number} —{" "}
            {meeting.openingHymn.title}
          </p>
          <p>Opening Prayer: {meeting.openingPrayer}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Ward Business</h2>
          {meeting.wardBusiness.length ? (
            <ul className="list-disc pl-6">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p>No ward business.</p>
          )}
          <p>Stake Business: {meeting.stakeBusiness ? "Yes" : "No"}</p>
        </section>

        {meeting.meetingType !== "stake" &&
          meeting.meetingType !== "general" && (
            <section>
              <h2 className="text-xl font-semibold">Sacrament</h2>
              <p>
                Sacrament Hymn: #{meeting.sacramentHymn.number} —{" "}
                {meeting.sacramentHymn.title}
              </p>
            </section>
          )}

        <section>
          <h2 className="text-xl font-semibold">
            Speakers and Musical Numbers
          </h2>
          {meeting.speakers.length ? (
            <ul className="list-disc pl-6">
              {meeting.speakers.map((item, index) => (
                <li key={index}>
                  {item.type === "musical-number"
                    ? "Musical Number"
                    : "Speaker"}
                  : {item.name} — {item.topic}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              {meeting.meetingType === "testimony"
                ? "Open testimony meeting."
                : "No speakers scheduled."}
            </p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold">Closing</h2>
          <p>
            Closing Hymn: #{meeting.closingHymn.number} —{" "}
            {meeting.closingHymn.title}
          </p>
          <p>Closing Prayer: {meeting.closingPrayer}</p>
        </section>
      </div>
    </article>
  );
}
