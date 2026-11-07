
"use client";

import { useSyncExternalStore } from "react";
import NavLinks from "./NavLinks";

const subscribe = () => () => {};

function getClientDate() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getServerDate() {
  return "";
}

export default function Header() {
  const date = useSyncExternalStore(
    subscribe,
    getClientDate,
    getServerDate
  );

  return (
    <header className="border-b bg-white px-6 py-5 text-gray-900 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xl font-bold">Sample Ward</p>
          <p className="text-sm text-gray-600">
            {date || "Loading date..."}
          </p>
        </div>

        <NavLinks />
      </div>
    </header>
  );
}
