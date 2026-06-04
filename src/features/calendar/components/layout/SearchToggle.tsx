"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { searchAtom } from "@/store/calendarAtoms";

export default function SearchToggle() {
  const [search, setSearch] = useAtom(searchAtom);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {showSearch && (
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
          placeholder="検索..."
        />
      )}

      <button onClick={() => setShowSearch(!showSearch)}>🔎</button>
    </>
  );
}
