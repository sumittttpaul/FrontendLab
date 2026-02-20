"use client";

import { useEffect, useRef, useState } from "react";

// Simulated async fetch
function fetchData(route: string) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Data loaded for ${route}`);
    }, 900);
  });
}

// ------------------------ Broken example (starts here) ------------------------------
function BrokenExample() {
  const [route, setRoute] = useState<"Route A" | "Route B">("Route A");
  const [data, setData] = useState<string>("");

  useEffect(() => {
    console.log("[BROKEN] request started for:", route);

    void (async () => {
      const result = await fetchData(route);
      console.log("[BROKEN] request resolved for:", route);
      setData(result); // ❌ may commit after route changes
    })();
  }, [route]);

  return (
    <div className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-3 font-semibold text-red-500 select-none">Broken</h3>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setRoute((prev) => (prev === "Route A" ? "Route B" : "Route A"))}
          className="rounded-full border px-5 py-2 text-sm select-none"
        >
          Switch Route
        </button>
      </div>

      <div className="mt-4 text-sm">
        <p className="font-medium select-none">Active Route: {route}</p>
        <p className="text-muted-foreground mt-2 h-7 select-none">{data}</p>
      </div>

      <p className="text-muted-foreground mt-4 text-sm select-none">Rapidly switch routes. Watch console for stale commits.</p>
    </div>
  );
}
// ------------------------ Broken example (ends here) ------------------------------

// ------------------------ Fixed example (starts here) ------------------------------
function FixedExample() {
  const [route, setRoute] = useState<"Route A" | "Route B">("Route A");
  const [data, setData] = useState<string>("");
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    console.log("[FIXED] request started for:", route);

    void (async () => {
      const result = await fetchData(route);

      if (requestId !== requestIdRef.current) {
        console.log("[FIXED] stale route response ignored");
        return;
      }

      console.log("[FIXED] request committed for:", route);
      setData(result);
    })();
  }, [route]);

  return (
    <div className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-3 font-semibold text-green-500 select-none">Fixed</h3>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setRoute((prev) => (prev === "Route A" ? "Route B" : "Route A"))}
          className="rounded-full border px-5 py-2 text-sm select-none"
        >
          Switch Route
        </button>
      </div>
      <div className="mt-4 text-sm">
        <p className="font-medium select-none">Active Route: {route}</p>
        <p className="text-muted-foreground mt-2 h-7 select-none">{data}</p>
      </div>
      <p className="text-muted-foreground mt-4 text-sm select-none">Only latest route request can commit state.</p>
    </div>
  );
}
// ------------------------ Fixed example (ends here) ------------------------------

// State update after route transition
export default function Page() {
  const [show, setShow] = useState<"broken" | "fixed">("broken");

  return (
    <main className="items-left mx-auto flex size-full max-w-200 flex-col justify-center gap-6 p-8 max-[56rem]:p-4">
      <div className="flex items-center gap-4">
        <span className="rounded-full border px-5 py-2 text-sm select-none">Viewing: {show.toUpperCase()} example</span>
      </div>
      {show === "broken" ? <BrokenExample /> : <FixedExample />}
      <p className="text-muted-foreground text-sm select-none">Switch routes quickly before request resolves.</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="hover:bg-input rounded-full border px-5 py-2 text-sm select-none hover:border-transparent"
          onClick={() => setShow((v) => (v === "broken" ? "fixed" : "broken"))}
        >
          Switch Example
        </button>
      </div>
    </main>
  );
}
