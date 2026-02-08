import { CopyContent } from "@/designs/elements/shadcn/copy-content";

export function Keyword({ children }: React.PropsWithChildren) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-xl border bg-[oklch(0.95_0_0)] pt-1 pr-2 pb-3 pl-4 max-[56rem]:rounded-none dark:bg-[oklch(0.18_0_0)]">
      <div className="flex w-full items-center justify-between">
        <h6 className="text-muted-foreground text-sm select-none">Keywords</h6>
        <div className="flex items-center">
          <CopyContent content={String(children)} variant="secondary" size="text" className="bg-transparent" />
        </div>
      </div>
      <p className="w-full pr-2 text-start font-mono text-base select-text max-sm:text-sm">{children}</p>
    </div>
  );
}
