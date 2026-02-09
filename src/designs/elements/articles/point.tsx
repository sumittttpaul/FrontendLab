export function PointContainer({ children }: { children: React.ReactNode }) {
  return <ul className="flex w-full flex-col gap-3 px-8 [&:has(+_p)]:-mb-4 [@media(max-width:56rem)]:px-4">{children}</ul>;
}

export function Point({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3.5 text-sm md:gap-5 md:text-base">
      <span className="text-muted-foreground/60 truncate">●</span>
      <span>{children}</span>
    </li>
  );
}
