"use client";

import { Input } from "@/designs/elements/shadcn/input";
import { useEffect, useRef, useState } from "react";

type Result = { id: number; title: string };

// Simulating API call with random delay
async function fetchResults(query: string) {
  await new Promise((r) => setTimeout(r, Math.random() * 1200));
  return [
    { id: 1, title: `Result for "${query}"` },
    { id: 2, title: `Another "${query}" result` },
  ];
}

// Topic: Async race condition in search results
export default function Page() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  // ------------------------ Broken code (starts here) ------------------------
  //   useEffect(() => {
  //     if (!query.trim()) return;

  //     void (async () => {
  //       try {
  //         const data = await fetchResults(query);
  //         console.log("commit results for:", query);
  //         setResults(data);
  //       } catch (error) {
  //         console.error("search request failed", error);
  //       }
  //     })();
  //   }, [query]);
  // ------------------------ Broken code (ends here) ------------------------

  // ------------------------ Fixed code (starts here) ------------------------
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!query.trim()) {
      requestIdRef.current = 0;
      return;
    }

    const requestId = ++requestIdRef.current;

    void (async () => {
      try {
        const data = await fetchResults(query);
        if (requestId === requestIdRef.current) {
          console.log("commit results for:", query);
          setResults(data);
        } else {
          console.log("ignored stale response for:", query);
        }
      } catch (error) {
        console.error("search request failed", error);
      }
    })();
  }, [query]);
  // ------------------------ Fixed code (ends here) ------------------------

  return (
    <main className="mx-auto flex size-full max-w-200 flex-col items-center justify-center gap-4 p-8 max-[56rem]:p-4">
      <Input placeholder="Search by product, category or brand" value={query} onChange={(e) => setQuery(e.target.value)} />
      <span className="h-15 w-full">
        {query.trim() && (
          <ul className="size-full">
            {results.map((r) => (
              <li key={r.id}>{r.title}</li>
            ))}
          </ul>
        )}
      </span>
    </main>
  );
}
