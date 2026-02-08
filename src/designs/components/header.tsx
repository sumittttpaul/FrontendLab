"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const ThemeSwitch = dynamic(() => import("./theme-switch").then((m) => m.ThemeSwitch), { ssr: false });

export function Header() {
  const { scrollY } = useScroll();
  const rawOpacity = useTransform(scrollY, [0, 1], [0, 1]);
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 400, damping: 40, restDelta: 0.001 });

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-50 flex w-full flex-col backdrop-blur-3xl">
      <div className="mx-auto flex h-14 w-full max-w-375 items-center justify-between gap-4 px-4">
        <Image src="./logo.svg" height={60} width={160} className="max-sm:h-10 max-sm:w-35 dark:invert" alt="" />
        <div className="flex items-center gap-x-2">
          <Link
            href="https://github.com/sumittttpaul/FrontendLab"
            className="hover:bg-input flex gap-x-2.5 rounded-full border border-black/15 p-1 text-sm/7 transition-all duration-100 ease-in hover:border-transparent active:scale-90 sm:pr-3 sm:pl-1.5 dark:border-white/15"
          >
            <Image src="./github.svg" className="dark:invert" height={25} width={25} alt="" />
            <span className="select-none max-sm:hidden">GitHub</span>
          </Link>
          <ThemeSwitch />
        </div>
      </div>
      <m.span style={{ opacity: smoothOpacity }} className="bg-border h-px w-full" />
    </header>
  );
}
