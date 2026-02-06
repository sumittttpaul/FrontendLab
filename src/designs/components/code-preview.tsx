import { Folder01Icon, ReactIcon, Cancel01Icon, Add01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { CopyContent } from "@/designs/elements/shadcn/copy-content";
import { ScrollArea } from "@/designs/elements/shadcn/scroll-area";
import { HugeiconsIcon } from "@hugeicons/react";
import { SyntaxHighlighter } from "./syntax-highlighter";

export function CodePreview({ children }: React.PropsWithChildren) {
  return (
    <div className="relative w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg bg-black/2.5 bg-[radial-gradient(var(--pattern-fg)_1px,transparent_0)] bg-size-[10px_10px] bg-fixed pt-8 pl-8 [--pattern-fg:var(--color-black)]/5 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-black/5 max-sm:pt-4 max-sm:pl-4 dark:bg-white/2.5 dark:[--pattern-fg:var(--color-white)]/10 dark:after:inset-ring-white/10">
      <div className="outline-l-none size-full rounded-tl-xl bg-[oklch(0.145_0_0)] pt-1 pl-2 outline outline-[color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="flex gap-2 p-2">
          <span className="size-3 rounded-full bg-white/20"></span>
          <span className="size-3 rounded-full bg-white/20"></span>
          <span className="size-3 rounded-full bg-white/20"></span>
        </div>
        <div className="flex size-full overflow-hidden rounded-tl-lg bg-[oklch(0.2_0_0)] outline outline-[color-mix(in_oklab,var(--color-white)_10%,transparent)]">
          <div className="flex w-full flex-col">
            <ScrollArea orientation="horizontal" className="relative w-full">
              <div className="flex w-full justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-2 border-t border-r border-t-[oklch(0.985_0_0)] border-r-[color-mix(in_oklab,var(--color-white)_10%,transparent)]/75 px-2 py-2.5 text-sm text-[oklch(0.985_0_0)] select-none">
                    <HugeiconsIcon icon={ReactIcon} size={18} strokeWidth={1.5} className="text-[oklch(0.985_0_0)]" />
                    palindrome.tsx
                    <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2} className="text-[oklch(0.985_0_0)] opacity-50" />
                  </span>
                  <HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={2} className="text-[oklch(0.985_0_0)] opacity-50" />
                </div>
                <div className="flex items-center pr-1.5">
                  <CopyContent content={children as string} variant="secondary" size="text" />
                </div>
              </div>
            </ScrollArea>
            <ScrollArea orientation="horizontal" className="relative w-full">
              <div className="flex w-auto items-center gap-2 border-y border-y-[color-mix(in_oklab,var(--color-white)_10%,transparent)]/75 px-2 py-2.5 text-xs font-medium text-[oklch(0.708_0_0)] select-none">
                <HugeiconsIcon icon={Folder01Icon} size={14} strokeWidth={2} className="min-w-3.5" />
                <span>frontendlab</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} className="min-w-3.5 opacity-75" />
                <HugeiconsIcon icon={Folder01Icon} size={14} strokeWidth={2} className="min-w-3.5" />
                <span>src</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} className="min-w-3.5 opacity-75" />
                <HugeiconsIcon icon={Folder01Icon} size={14} strokeWidth={2} className="min-w-3.5" />
                <span>app</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} className="min-w-3.5 opacity-75" />
                <HugeiconsIcon icon={ReactIcon} size={14} strokeWidth={2} className="min-w-3.5" />
                <span>palindrome.tsx</span>
              </div>
            </ScrollArea>
            <ScrollArea orientation="horizontal" className="relative w-full">
              <div className="p-5 max-sm:p-3">
                <SyntaxHighlighter
                  code={`import React from "react";
import uniquePropHOC from "./lib/unique-prop-hoc";

// this comment is here to demonstrate an extremely long line length.

class Expire extends React.Component {
    constructor(props) {
        super(props);
        this.state = { component: props.children }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                component: null
            });
        }, this.props.time || this.props.seconds * 1000);
    }
    render() {
        return this.state.component;
    }
}

export default uniquePropHOC(["time", "seconds"])(Expire);`}
                />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
