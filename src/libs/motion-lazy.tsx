"use client";

import { LazyMotion, domMax } from "motion/react";

export function MotionLazy({ children }: React.PropsWithChildren) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
