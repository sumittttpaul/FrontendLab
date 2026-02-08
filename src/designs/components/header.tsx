"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";
import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("./theme-switch").then((m) => m.ThemeSwitch), { ssr: false });

export function Header() {
  const { scrollY } = useScroll();
  const rawOpacity = useTransform(scrollY, [0, 1], [0, 1]);
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 400, damping: 40, restDelta: 0.001 });

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 flex w-full flex-col backdrop-blur-3xl">
      <div className="mx-auto flex h-14 w-full max-w-375 items-center justify-between gap-4 px-4">
        <h1 className="text-xl font-bold select-none">Frontend Lab</h1>
        <ThemeSwitch />
      </div>
      <m.span style={{ opacity: smoothOpacity }} className="bg-border h-px w-full" />
    </header>
  );
}
