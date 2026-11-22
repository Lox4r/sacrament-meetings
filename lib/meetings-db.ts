
import "server-only";
import { sql } from "./db";
import type { SacramentMeeting, MeetingType } from "./types";

type MeetingRow = {
  id: number;
  date: string;
  meeting_type: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: SacramentMeeting["openingHymn"];
  opening_prayer: string;
  ward_business: SacramentMeeting["wardBusiness"] | null;
  stake_business: boolean | null;
  sacrament_hymn: SacramentMeeting["sacramentHymn"];
  speakers: SacramentMeeting["speakers"] | null;
  closing_hymn: SacramentMeeting["closingHymn"];
  closing_prayer: string;
};

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business ?? false,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

const meetingColumns = `
  id,
  date::text AS date,
  meeting_type,
  presiding,
  conducting,
  announcements,
  opening_hymn,
  opening_prayer,
  ward_business,
  stake_business,
  sacrament_hymn,
  speakers,
  closing_hymn,
  closing_prayer
`;

// Get all meetings
export async function getMeetings(): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT
      id, date::text AS date, meeting_type,
      presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business,
      stake_business, sacrament_hymn, speakers,
      closing_hymn, closing_prayer
    FROM meetings
    ORDER BY date DESC
  `;

  return (rows as MeetingRow[]).map(mapMeeting);
}

// Get a meeting by ID
export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const rows = await sql`
    SELECT
      id, date::text AS date, meeting_type,
      presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business,
      stake_business, sacrament_hymn, speakers,
      closing_hymn, closing_prayer
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  return rows.length
    ? mapMeeting(rows[0] as MeetingRow)
    : undefined;
}

// Get a meeting by date
export async function getMeetingByDate(
  date: string
): Promise<SacramentMeeting | undefined> {
  const rows = await sql`
    SELECT
      id, date::text AS date, meeting_type,
      presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business,
      stake_business, sacrament_hymn, speakers,
      closing_hymn, closing_prayer
    FROM meetings
    WHERE date = ${date}::date
    LIMIT 1
  `;

  return rows.length
    ? mapMeeting(rows[0] as MeetingRow)
    : undefined;
}

export type MeetingInput = {
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  openingPrayer: string;
  closingPrayer: string;
  openingHymnNumber: number;
  openingHymnTitle: string;
  sacramentHymnNumber: number;
  sacramentHymnTitle: string;
  closingHymnNumber: number;
  closingHymnTitle: string;
};

export async function updateMeetingInDb(
  id: number,
  data: MeetingInput
): Promise<boolean> {
  const rows = await sql`
    UPDATE meetings
    SET
      date = ${data.date}::date,
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      opening_prayer = ${data.openingPrayer},
      closing_prayer = ${data.closingPrayer},
      opening_hymn = ${JSON.stringify({
        number: data.openingHymnNumber,
        title: data.openingHymnTitle,
      })}::jsonb,
      sacrament_hymn = ${JSON.stringify({
        number: data.sacramentHymnNumber,
        title: data.sacramentHymnTitle,
      })}::jsonb,
      closing_hymn = ${JSON.stringify({
        number: data.closingHymnNumber,
        title: data.closingHymnTitle,
      })}::jsonb
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}

export async function deleteMeetingInDb(
  id: number
): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}
