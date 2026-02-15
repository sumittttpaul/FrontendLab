import { cn } from "@/libs/cn";

const Crosshair = ({ className = "" }: { className?: string }) => (
  <div className={cn("absolute z-20 flex size-6 max-h-6 min-h-6 max-w-6 min-w-6 items-center justify-center", className)}>
    <div className="dark:bg-muted-foreground h-full w-px bg-black"></div>
    <div className="dark:bg-muted-foreground absolute h-px w-full bg-black"></div>
  </div>
);

export function Separator() {
  return (
    <div className="relative h-px w-[calc(100vw-2rem)] max-w-284 bg-black/15 dark:bg-white/15 [@media(width>=56rem)]:w-[calc(100vw-4.7rem)] [@media(width>=76rem)]:w-[200%]">
      <Crosshair className="-top-3 -left-3" />
    </div>
  );
}
