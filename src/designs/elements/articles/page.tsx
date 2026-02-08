import { cn } from "@/libs/cn";

const Crosshair = ({ className = "" }: { className?: string }) => (
  <div className={cn("absolute z-20 flex size-6 max-h-6 min-h-6 max-w-6 min-w-6 items-center justify-center", className)}>
    <div className="dark:bg-muted-foreground h-full w-px bg-black"></div>
    <div className="dark:bg-muted-foreground absolute h-px w-full bg-black"></div>
  </div>
);

const DashedLine = ({ className = "" }: { className?: string }) => (
  <span className={cn("relative h-full border-r border-dashed opacity-75", className)} />
);

export function Page({ children }: React.PropsWithChildren) {
  return (
    <main className="mx-auto size-full max-w-300 p-8 max-[56rem]:p-4">
      <div className="relative flex size-full flex-col items-center justify-center md:mt-15 [@media(max-width:56rem)]:mt-5">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="relative size-full border">
            <div className="grid size-full grid-cols-2 md:grid-cols-3">
              <DashedLine />
              <DashedLine className="hidden md:block" />
              <Crosshair className="-top-[0.8rem] -left-[0.8rem]" />
              <Crosshair className="-right-[0.8rem] -bottom-[0.8rem]" />
            </div>
          </div>
        </div>
        <article className="relative z-10 mx-auto flex size-full max-w-200 flex-col items-center justify-center gap-8 pt-10 pb-8 max-[56rem]:max-w-full md:gap-12.5 md:pt-20 md:pb-12.5">
          {children}
        </article>
      </div>
    </main>
  );
}
