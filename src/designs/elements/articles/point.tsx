export function PointContainer({ children }: { children: React.ReactNode }) {
  return <ul className="flex w-full flex-col gap-3 px-8 [&:has(+_p)]:-mb-4 [@media(max-width:56rem)]:px-4">{children}</ul>;
}

export function Point({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-justify text-sm text-pretty md:text-base">
      <span className="text-muted-foreground/60 mr-3.5 truncate md:mr-5">●</span>
      {children}
    </li>
  );
}
