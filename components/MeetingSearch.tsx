
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const [search, setSearch] = useState(query);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("query", value.trim());
    } else {
      params.delete("query");
    }

    params.set("page", "1");

    router.replace(`/meetings?${params.toString()}`);
  }, 350);

  return (
    <input
      type="search"
      value={search}
      onChange={(event) => {
        const value = event.target.value;
        setSearch(value);
        handleSearch(value);
      }}
      placeholder="Search meetings..."
      aria-label="Search meetings"
      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
    />
  );
}
