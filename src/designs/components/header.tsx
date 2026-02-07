"use client";

import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("./theme-switch").then((m) => m.ThemeSwitch), { ssr: false });

export function Header() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full backdrop-blur-3xl">
      <div className="mx-auto flex h-14 w-full max-w-375 items-center justify-between gap-4 px-4">
        <h1 className="text-xl font-bold select-none">Frontend Lab</h1>
        <ThemeSwitch />
      </div>
    </header>
  );
}
