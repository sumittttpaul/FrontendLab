"use client";

import { useRef, useState } from "react";

// Deterministic delay for recording
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ------------------------ Broken code (starts here) ------------------------
function BrokenExample() {
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (loading) return;

    console.log("[BROKEN] submit triggered");
    setLoading(true);

    void (async () => {
      await delay(800);
      console.log("[BROKEN] request finished");
      setLoading(false);
    })();
  }

  return (
    <div className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-3 font-semibold text-red-500 select-none">Broken</h3>
      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="rounded-full border px-5 py-2 text-sm select-none disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      <p className="text-muted-foreground mt-4 text-sm select-none">Rapidly click the button. Check console for duplicate submits.</p>
    </div>
  );
}
// ------------------------ Broken code (ends here) ------------------------

// ------------------------ Fixed code (starts here) ------------------------
function FixedExample() {
  const [loading, setLoading] = useState(false);
  const inFlightRef = useRef(false);

  function handleSubmit() {
    if (inFlightRef.current) {
      console.log("[FIXED] duplicate submit prevented");
      return;
    }

    inFlightRef.current = true;
    console.log("[FIXED] submit triggered");
    setLoading(true);

    void (async () => {
      await delay(800);
      console.log("[FIXED] request finished");
      inFlightRef.current = false;
      setLoading(false);
    })();
  }

  return (
    <div className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-3 font-semibold text-green-500 select-none">Fixed</h3>
      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="rounded-full border px-5 py-2 text-sm select-none disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      <p className="text-muted-foreground mt-4 text-sm select-none">Execution lock prevents duplicate side effects.</p>
    </div>
  );
}
// ------------------------ Fixed code (ends here) ------------------------

// Double submit caused by UI state lag
export default function Page() {
  const [show, setShow] = useState<"broken" | "fixed">("broken");

  return (
    <main className="mx-auto flex size-full max-w-200 flex-col items-left justify-center gap-6 p-8 max-[56rem]:p-4">
      <div className="flex items-center gap-4">
        <span className="rounded-full border px-5 py-2 text-sm select-none">Viewing: {show.toUpperCase()} example</span>
      </div>
      {show === "broken" ? <BrokenExample /> : <FixedExample />}
      <p className="text-muted-foreground text-sm select-none">Click rapidly before UI disables the button.</p>
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
