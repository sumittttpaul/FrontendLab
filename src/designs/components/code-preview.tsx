import { Folder01Icon, ReactIcon, Cancel01Icon, Add01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { CopyContent } from "@/designs/elements/shadcn/copy-content";
import { ScrollArea } from "@/designs/elements/shadcn/scroll-area";
import { SyntaxHighlighter } from "./syntax-highlighter";
import { HugeiconsIcon } from "@hugeicons/react";
import { Fragment } from "react";

export function CodePreview({ children, code, path }: React.PropsWithChildren<{ code: string; path: string }>) {
  const parts = path.split("/").filter(Boolean);
  const fileName = parts.pop();
  const directories = parts;

  return (
    <div className="bg-background relative flex w-full max-w-[calc(100vw-2rem)]">
      <div className="after:inset-ring-border relative w-full overflow-hidden rounded-lg bg-black/4 bg-[radial-gradient(var(--pattern-fg)_1px,transparent_0)] bg-size-[10px_10px] bg-fixed pt-8 pl-8 [--pattern-fg:var(--color-black)]/5 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring max-[56rem]:rounded-none after:max-[56rem]:rounded-none max-sm:pt-4 max-sm:pl-4 dark:bg-white/4 dark:[--pattern-fg:var(--color-white)]/10">
        <div className="outline-l-none outline-border size-full rounded-tl-xl bg-[oklch(0_0_0)] pt-1 pl-2 outline">
          <div className="flex gap-2 p-2">
            <span className="size-3 rounded-full bg-white/20"></span>
            <span className="size-3 rounded-full bg-white/20"></span>
            <span className="size-3 rounded-full bg-white/20"></span>
          </div>
          <div className="flex size-full overflow-hidden rounded-tl-lg bg-[oklch(0.18_0_0)] outline outline-[color-mix(in_oklab,var(--color-white)_10%,transparent)]">
            <div className="flex w-full flex-col">
              <ScrollArea orientation="horizontal" className="relative w-full">
                <div className="flex w-full justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-2 border-t border-r border-t-[oklch(0.985_0_0)] border-r-[color-mix(in_oklab,var(--color-white)_10%,transparent)]/75 px-2 py-2.5 text-sm text-[oklch(0.985_0_0)] select-none max-sm:gap-1.5 max-sm:text-xs">
                      <HugeiconsIcon icon={ReactIcon} size={18} strokeWidth={1.5} className="text-[oklch(0.985_0_0)] max-sm:size-3.5" />
                      {fileName}
                      <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2} className="text-[oklch(0.985_0_0)] opacity-50 max-sm:size-3" />
                    </span>
                    <HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={2} className="text-[oklch(0.985_0_0)] opacity-50 max-sm:size-3.5" />
                  </div>
                  <div className="flex items-center pr-1.5 max-sm:pr-1">
                    <CopyContent
                      size="text"
                      text="Copy code"
                      variant="secondary"
                      content={String(children)}
                      textClassName="text-[oklch(0.985_0_0)]"
                      iconClassName="text-[oklch(0.985_0_0)]"
                    />
                  </div>
                </div>
              </ScrollArea>
              <ScrollArea orientation="horizontal" className="relative w-full">
                <div className="flex w-auto items-center gap-2 border-y border-y-[color-mix(in_oklab,var(--color-white)_10%,transparent)]/75 px-2 py-2.5 text-xs font-medium text-[oklch(0.708_0_0)] select-none max-sm:gap-1.5 max-sm:px-1.5">
                  {directories.map((directory, index) => (
                    <Fragment key={index}>
                      <HugeiconsIcon icon={Folder01Icon} size={14} strokeWidth={2} className="min-w-3.5" />
                      <span>{directory}</span>
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} className="min-w-3.5 opacity-75" />
                    </Fragment>
                  ))}
                  {fileName && (
                    <>
                      <HugeiconsIcon icon={ReactIcon} size={14} strokeWidth={2} className="min-w-3.5" />
                      <span>{fileName}</span>
                    </>
                  )}
                </div>
              </ScrollArea>
              <ScrollArea orientation="horizontal" className="relative w-full">
                <div className="p-5 max-md:text-sm max-sm:p-3">
                  <SyntaxHighlighter code={code} />
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
