"use client";

import { useRef, useState } from "react";

// Deterministic async simulation
function fakeRequest(shouldFail: boolean) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject();
      else resolve();
    }, 900);
  });
}

// ------------------------ Broken code (starts here) -------------------------------
function BrokenExample() {
  const [liked, setLiked] = useState(false);
  const [failNext, setFailNext] = useState(false);

  function handleToggle() {
    const previous = liked;

    console.log("[BROKEN] optimistic update →", !liked);
    setLiked(!liked); // optimistic update

    void (async () => {
      try {
        await fakeRequest(failNext);
        console.log("[BROKEN] server confirmed");
      } catch {
        console.log("[BROKEN] server failed → rolling back");
        setLiked(previous); // ❌ rollback to possibly stale value
      }
      setFailNext(false);
    })();
  }

  return (
    <div className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-3 font-semibold text-red-500 select-none">Broken</h3>
      <div className="flex items-center gap-4">
        <button type="button" onClick={handleToggle} className="rounded-full border px-5 py-2 text-sm select-none">
          {liked ? "Liked ❤️" : "Like 🤍"}
        </button>
        <button type="button" onClick={() => setFailNext(true)} className="rounded-full border px-4 py-2 text-xs select-none">
          Fail Next Request
        </button>
      </div>
      <p className="text-muted-foreground mt-4 text-sm select-none">Toggle rapidly and optionally fail one request.</p>
    </div>
  );
}
// ------------------------ Broken code (ends here) -------------------------------

// ------------------------ Fixed code (starts here) -------------------------------
function FixedExample() {
  const [liked, setLiked] = useState(false);
  const [failNext, setFailNext] = useState(false);
  const requestIdRef = useRef(0);

  function handleToggle() {
    const requestId = ++requestIdRef.current;

    console.log("[FIXED] optimistic update →", !liked);
    setLiked((prev) => !prev);

    void (async () => {
      try {
        await fakeRequest(failNext);

        if (requestId !== requestIdRef.current) {
          console.log("[FIXED] stale success ignored");
          return;
        }

        console.log("[FIXED] server confirmed");
      } catch {
        if (requestId !== requestIdRef.current) {
          console.log("[FIXED] stale failure ignored");
          return;
        }

        console.log("[FIXED] server failed → reverting safely");
        setLiked((prev) => !prev);
      }
      setFailNext(false);
    })();
  }

  return (
    <div className="w-full rounded-2xl border px-5 py-4">
      <h3 className="mb-3 font-semibold text-green-500 select-none">Fixed</h3>
      <div className="flex items-center gap-4">
        <button type="button" onClick={handleToggle} className="rounded-full border px-5 py-2 text-sm select-none">
          {liked ? "Liked ❤️" : "Like 🤍"}
        </button>
        <button type="button" onClick={() => setFailNext(true)} className="rounded-full border px-4 py-2 text-xs select-none">
          Fail Next Request
        </button>
      </div>
      <p className="text-muted-foreground mt-4 text-sm select-none">Only latest request can commit success or rollback.</p>
    </div>
  );
}
// ------------------------ Fixed code (ends here) ------------------------

// Optimistic UI rollback failure
export default function Page() {
  const [show, setShow] = useState<"broken" | "fixed">("broken");

  return (
    <main className="items-left mx-auto flex size-full max-w-200 flex-col justify-center gap-6 p-8 max-[56rem]:p-4">
      <div className="flex items-center gap-4">
        <span className="rounded-full border px-5 py-2 text-sm">Viewing: {show.toUpperCase()} example</span>
      </div>
      {show === "broken" ? <BrokenExample /> : <FixedExample />}
      <p className="text-muted-foreground text-sm">Toggle quickly → optionally fail a request → observe console logs.</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="hover:bg-input rounded-full border px-5 py-2 text-sm hover:border-transparent"
          onClick={() => setShow((v) => (v === "broken" ? "fixed" : "broken"))}
        >
          Switch
        </button>
      </div>
    </main>
  );
}
