"use client";

import { useEffect, useRef, useState } from "react";

// ------------------------ Broken code (starts here) ------------------------
function BrokenExample() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClick(_: MouseEvent) {
      console.log("[BROKEN] listener sees open =", open);

      // Simulate click-outside logic
      if (open) {
        console.log("[BROKEN] closing dropdown");
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []); // Listener never updates when `open` changes

  return (
    <div className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-3 font-semibold text-red-500 select-none">Broken</h3>

      <button
        type="button"
        className="hover:bg-input rounded-full border px-5 py-2 text-sm select-none hover:border-transparent"
        onClick={(e) => {
          e.stopPropagation(); // prevent immediate close
          console.log("[BROKEN] toggling dropdown → true");
          setOpen(true);
        }}
      >
        Open Dropdown
      </button>

      {open && (
        <div className="bg-muted mt-4 rounded-xl border p-4" onClick={(e) => e.stopPropagation()}>
          Dropdown Content
        </div>
      )}

      <p className="text-muted-foreground mt-4 text-sm">Open dropdown → click outside → check console.</p>
    </div>
  );
}
// ------------------------ Broken code (ends here) ------------------------

// ------------------------ Fixed code (starts here) ------------------------
function FixedExample() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keep ref synced with state
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;

      const isOutside = containerRef.current && !containerRef.current.contains(target);

      console.log("[FIXED] click detected | openRef:", openRef.current, "| outside:", isOutside);

      if (openRef.current && isOutside) {
        console.log("[FIXED] closing dropdown");
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-3 font-semibold text-green-500">Fixed</h3>

      <button
        type="button"
        className="hover:bg-input rounded-full border px-5 py-2 text-sm select-none hover:border-transparent"
        onClick={() => {
          console.log("[FIXED] toggling dropdown → true");
          setOpen(true);
        }}
      >
        Open Dropdown
      </button>

      {open && <div className="bg-muted mt-4 rounded-xl border p-4">Dropdown Content</div>}

      <p className="text-muted-foreground mt-4 text-sm">Listener is stable and checks outside correctly.</p>
    </div>
  );
}
// ------------------------ Fixed code (ends here) ------------------------

// Stale closure in click outside listener
export default function Page() {
  const [show, setShow] = useState<"broken" | "fixed">("broken");

  return (
    <main className="mx-auto flex size-full max-w-200 flex-col items-center justify-center gap-6 p-8 max-[56rem]:p-4">
      <div className="flex items-center gap-4">
        <span className="rounded-full border px-5 py-2 text-sm select-none">Viewing: {show.toUpperCase()} example</span>
      </div>

      {show === "broken" ? <BrokenExample /> : <FixedExample />}

      <p className="text-muted-foreground text-sm">Open dropdown → click anywhere outside → observe console logs.</p>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="hover:bg-input rounded-full border px-5 py-2 text-sm select-none hover:border-transparent"
          onClick={() => setShow((v) => (v === "broken" ? "fixed" : "broken"))}
        >
          Switch
        </button>
      </div>
    </main>
  );
}
