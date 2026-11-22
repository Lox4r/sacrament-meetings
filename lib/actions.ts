
"use server";

import { z } from "zod";
import { sql } from "./db";
import { updateMeetingInDb } from "./meetings-db";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";
import { deleteMeetingInDb } from "./meetings-db";

// Validate meeting form data
const MeetingFormSchema = z.object({
  date: z.iso.date(),

  meetingType: z.enum([
    "regular",
    "testimony",
    "stake",
    "general",
    "special",
  ]),

  presiding: z.string().trim().min(
    1,
    "Presiding officer is required."
  ),

  conducting: z.string().trim().min(
    1,
    "Conducting officer is required."
  ),

  openingPrayer: z.string().trim().min(
    1,
    "Opening prayer is required."
  ),

  closingPrayer: z.string().trim().min(
    1,
    "Closing prayer is required."
  ),

  openingHymnNumber: z.coerce
    .number<number>()
    .int()
    .positive(),

  openingHymnTitle: z.string().trim().min(
    1,
    "Opening hymn title is required."
  ),

  sacramentHymnNumber: z.coerce
    .number<number>()
    .int()
    .positive(),

  sacramentHymnTitle: z.string().trim().min(
    1,
    "Sacrament hymn title is required."
  ),

  closingHymnNumber: z.coerce
    .number<number>()
    .int()
    .positive(),

  closingHymnTitle: z.string().trim().min(
    1,
    "Closing hymn title is required."
  ),
});

// State returned to the form
export type MeetingFormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

// Extract form data
function getMeetingFormData(formData: FormData) {
  return {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
  };
}

// CREATE MEETING
export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const validated = MeetingFormSchema.safeParse(
    getMeetingFormData(formData)
  );

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const data = validated.data;

  try {
    await sql`
      INSERT INTO meetings (
        date,
        meeting_type,
        presiding,
        conducting,
        opening_hymn,
        opening_prayer,
        sacrament_hymn,
        closing_hymn,
        closing_prayer
      )
      VALUES (
        ${data.date},
        ${data.meetingType},
        ${data.presiding},
        ${data.conducting},
        ${JSON.stringify({
          number: data.openingHymnNumber,
          title: data.openingHymnTitle,
        })}::jsonb,
        ${data.openingPrayer},
        ${JSON.stringify({
          number: data.sacramentHymnNumber,
          title: data.sacramentHymnTitle,
        })}::jsonb,
        ${JSON.stringify({
          number: data.closingHymnNumber,
          title: data.closingHymnTitle,
        })}::jsonb,
        ${data.closingPrayer}
      )
    `;
  } catch (error) {
    console.error("Failed to create meeting:", error);

    return {
      message: "Unable to create the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

// UPDATE MEETING
export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  if (!Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  const validated = MeetingFormSchema.safeParse(
    getMeetingFormData(formData)
  );

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  let updated = false;

  try {
    updated = await updateMeetingInDb(
      id,
      validated.data
    );
  } catch (error) {
    console.error("Failed to update meeting:", error);

    return {
      message: "Unable to update the meeting. Please try again.",
    };
  }

  if (!updated) {
    notFound();
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);

  redirect(`/meetings/${id}`);
}


export async function deleteMeeting(
  id: number
): Promise<void> {
  if (!Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  try {
    const deleted = await deleteMeetingInDb(id);

    if (!deleted) {
      return;
    }
  } catch (error) {
    console.error("Failed to delete meeting:", error);
    throw new Error("Unable to delete the meeting.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);

  redirect("/meetings");
}
