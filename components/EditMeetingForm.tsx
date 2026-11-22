"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  updateMeeting,
  type MeetingFormState,
} from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

const initialState: MeetingFormState = {
  message: "",
  errors: {},
};

export default function EditMeetingForm({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  const updateAction = updateMeeting.bind(null, meeting.id);

  const [state, formAction, isPending] = useActionState(
    updateAction,
    initialState
  );

  const fields = [
    {
      name: "date",
      label: "Meeting Date",
      type: "date",
      value: meeting.date,
    },
    {
      name: "presiding",
      label: "Presiding Officer",
      value: meeting.presiding,
    },
    {
      name: "conducting",
      label: "Conducting Officer",
      value: meeting.conducting,
    },
    {
      name: "openingPrayer",
      label: "Opening Prayer",
      value: meeting.openingPrayer,
    },
    {
      name: "openingHymnNumber",
      label: "Opening Hymn Number",
      type: "number",
      value: meeting.openingHymn.number,
    },
    {
      name: "openingHymnTitle",
      label: "Opening Hymn Title",
      value: meeting.openingHymn.title,
    },
    {
      name: "sacramentHymnNumber",
      label: "Sacrament Hymn Number",
      type: "number",
      value: meeting.sacramentHymn.number,
    },
    {
      name: "sacramentHymnTitle",
      label: "Sacrament Hymn Title",
      value: meeting.sacramentHymn.title,
    },
    {
      name: "closingHymnNumber",
      label: "Closing Hymn Number",
      type: "number",
      value: meeting.closingHymn.number,
    },
    {
      name: "closingHymnTitle",
      label: "Closing Hymn Title",
      value: meeting.closingHymn.title,
    },
    {
      name: "closingPrayer",
      label: "Closing Prayer",
      value: meeting.closingPrayer,
    },
  ];

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="meetingType"
          className="mb-1 block font-medium"
        >
          Meeting Type
        </label>

        <select
          id="meetingType"
          name="meetingType"
          defaultValue={meeting.meetingType}
          className="w-full rounded border p-2"
          aria-describedby="meetingType-error"
          aria-invalid={!!state.errors?.meetingType}
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>

        <p
          id="meetingType-error"
          aria-live="polite"
          className="text-sm text-red-600"
        >
          {state.errors?.meetingType?.join(", ")}
        </p>
      </div>

      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-1 block font-medium"
          >
            {field.label}
          </label>

          <input
            id={field.name}
            name={field.name}
            type={field.type ?? "text"}
            defaultValue={field.value}
            className="w-full rounded border p-2"
            aria-describedby={`${field.name}-error`}
            aria-invalid={!!state.errors?.[field.name]}
          />

          <p
            id={`${field.name}-error`}
            aria-live="polite"
            className="text-sm text-red-600"
          >
            {state.errors?.[field.name]?.join(", ")}
          </p>
        </div>
      ))}

      <p role="status" aria-live="polite">
        {state.message}
      </p>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-700 px-5 py-2 text-white disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>

        <Link
          href={`/meetings/${meeting.id}`}
          className="text-blue-600 hover:underline"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
