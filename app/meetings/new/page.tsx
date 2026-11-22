
"use client";

import { useActionState } from "react";
import {
  createMeeting,
  type MeetingFormState,
} from "@/lib/actions";

const initialState: MeetingFormState = {
  message: "",
  errors: {},
};

const fields = [
  { name: "date", label: "Meeting Date", type: "date" },
  { name: "presiding", label: "Presiding Officer" },
  { name: "conducting", label: "Conducting Officer" },
  { name: "openingPrayer", label: "Opening Prayer" },
  { name: "openingHymnNumber", label: "Opening Hymn Number", type: "number" },
  { name: "openingHymnTitle", label: "Opening Hymn Title" },
  { name: "sacramentHymnNumber", label: "Sacrament Hymn Number", type: "number" },
  { name: "sacramentHymnTitle", label: "Sacrament Hymn Title" },
  { name: "closingHymnNumber", label: "Closing Hymn Number", type: "number" },
  { name: "closingHymnTitle", label: "Closing Hymn Title" },
  { name: "closingPrayer", label: "Closing Prayer" },
];

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Create New Meeting
      </h1>

      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="meetingType" className="block mb-1">
            Meeting Type
          </label>

          <select
            id="meetingType"
            name="meetingType"
            defaultValue="regular"
            className="w-full rounded border p-2 text-black"
            aria-describedby="meetingType-error"
            aria-invalid={!!state.errors?.meetingType}
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>

          <p id="meetingType-error" aria-live="polite" className="text-red-400">
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
              className="w-full rounded border p-2 text-black"
              aria-describedby={`${field.name}-error`}
              aria-invalid={!!state.errors?.[field.name]}
            />

            <p
              id={`${field.name}-error`}
              aria-live="polite"
              className="text-sm text-red-400"
            >
              {state.errors?.[field.name]?.join(", ")}
            </p>
          </div>
        ))}

        <p role="status" aria-live="polite">
          {state.message}
        </p>

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-green-700 px-5 py-2 text-white disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Create Meeting"}
        </button>
      </form>
    </main>
  );
}
