"use client";

import { useEffect, useRef, useState } from "react";

// Simulated async work (deterministic delay)
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ------------------------ Broken code (starts here) ------------------------
function BrokenExample() {
  const [status, setStatus] = useState<"loading" | "loaded">("loading");

  useEffect(() => {
    console.log("[BROKEN] Screen mounted → async work started");
    void (async () => {
      await delay(800);
      console.log("[BROKEN] Async finished → updating screen");
      setStatus("loaded");
    })();
    return () => {
      console.log("[BROKEN] Screen unmounted");
    };
  }, []);

  return (
    <div className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-2 font-semibold text-red-500">Broken</h3>
      <p>Status: {status}</p>
      <p className="text-muted-foreground mt-2 text-sm">Navigate away before async resolves. Check console.</p>
    </div>
  );
}
// ------------------------ Broken code (ends here) ------------------------

// ------------------------ Fixed code (starts here) ------------------------
function FixedExample() {
  const [status, setStatus] = useState<"loading" | "loaded">("loading");
  const effectIdRef = useRef(0);

  useEffect(() => {
    const effectId = ++effectIdRef.current;
    console.log("[FIXED] Screen mounted → ownership id:", effectId);

    void (async () => {
      await delay(800);
      if (effectId !== effectIdRef.current) {
        console.log("[FIXED] Async finished → ownership no longer valid, update skipped:", effectId);
        return;
      }
      console.log("[FIXED] Async finished → ownership valid, screen updated:", effectId);
      setStatus("loaded");
    })();

    return () => {
      if (effectIdRef.current === effectId) effectIdRef.current = -1;
      console.log("[FIXED] Screen unmounted → ownership invalidated:", effectId);
    };
  }, []);

  return (
    <div className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-2 font-semibold text-green-500">Fixed</h3>
      <p>Status: {status}</p>
      <p className="text-muted-foreground mt-2 text-sm">Async commits only if ownership is still valid.</p>
    </div>
  );
}
// ------------------------ Fixed code (ends here) ------------------------

// Topic: State update after unmount during navigation
export default function Page() {
  const [show, setShow] = useState<"broken" | "fixed">("broken");

  return (
    <main className="mx-auto flex size-full max-w-200 flex-col items-center justify-center gap-6 p-8 max-[56rem]:p-4">
      <div className="flex items-center gap-4">
        <span className="rounded-full border px-5 py-2 text-sm">Viewing: {show.toUpperCase()} example</span>
      </div>
      {show === "broken" ? <BrokenExample /> : <FixedExample />}
      <p className="text-muted-foreground text-sm">Open console → mount page → immediately navigate away → observe logs.</p>
      <div className="flex items-center gap-4">
        <button
          className="hover:bg-input rounded-full border px-5 py-2 text-sm hover:border-transparent"
          onClick={() => setShow((v) => (v === "broken" ? "fixed" : "broken"))}
        >
          Switch
        </button>
      </div>
    </main>
  );
}
