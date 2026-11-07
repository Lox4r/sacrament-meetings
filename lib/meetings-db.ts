
import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-10-11",
    meetingType: "regular",
    presiding: "Bishop Anderson",
    conducting: "Brother Martinez",
    announcements: ["Ward service activity on Saturday."],
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Sister Lopez",
    wardBusiness: [{ description: "Welcome new ward members." }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "Brother Garcia", topic: "Faith", type: "speaker" },
      { name: "Sister Johnson", topic: "Service", type: "speaker" },
    ],
    closingHymn: { number: 152, title: "God Be with You Till We Meet Again" },
    closingPrayer: "Brother Wilson",
  },
  {
    id: 2,
    date: "2026-10-18",
    meetingType: "regular",
    presiding: "Bishop Anderson",
    conducting: "Brother Martinez",
    announcements: ["Youth activity on Wednesday."],
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Brother Smith",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "Sister Davis", topic: "Hope", type: "speaker" },
    ],
    closingHymn: { number: 152, title: "God Be with You Till We Meet Again" },
    closingPrayer: "Sister Brown",
  },
  {
    id: 3,
    date: "2026-10-25",
    meetingType: "regular",
    presiding: "Bishop Anderson",
    conducting: "Brother Martinez",
    announcements: ["Ward temple trip next month."],
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Brother Taylor",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "Brother Thomas", topic: "Charity", type: "speaker" },
    ],
    closingHymn: { number: 85, title: "How Firm a Foundation" },
    closingPrayer: "Sister Miller",
  },
  {
    id: 4,
    date: "2026-11-01",
    meetingType: "testimony",
    presiding: "Bishop Anderson",
    conducting: "Brother Martinez",
    announcements: ["Fast and testimony meeting."],
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Sister Garcia",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [],
    closingHymn: { number: 152, title: "God Be with You Till We Meet Again" },
    closingPrayer: "Brother Lopez",
  },
  {
    id: 5,
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop Anderson",
    conducting: "Brother Martinez",
    announcements: ["Ward council meeting after church."],
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Sister Johnson",
    wardBusiness: [{ description: "Ward announcements." }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "Brother Wilson", topic: "Prayer", type: "speaker" },
      { name: "Sister Brown", topic: "Gratitude", type: "speaker" },
    ],
    closingHymn: { number: 3, title: "Now Let Us Rejoice" },
    closingPrayer: "Brother Smith",
  },
];

export function getMeetings(): SacramentMeeting[] {
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export function getMeetingByDate(date: string): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.date === date);
}