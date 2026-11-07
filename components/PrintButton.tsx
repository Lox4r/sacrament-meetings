
"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
    >
      Print Program
    </button>
  );
}
