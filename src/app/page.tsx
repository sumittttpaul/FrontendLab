import { CodePreview } from "@/designs/components/code-preview";
import { VideoPlayer } from "@/designs/components/video-player";

import { cn } from "@/libs/cn";

const Crosshair = ({ className = "" }: { className?: string }) => (
  <div className={cn("absolute z-20 flex size-6 max-h-6 min-h-6 max-w-6 min-w-6 items-center justify-center", className)}>
    <div className="dark:bg-muted-foreground h-full w-px bg-black"></div>
    <div className="dark:bg-muted-foreground absolute h-px w-full bg-black"></div>
  </div>
);

const DashedLine = () => <span className="relative h-full border-r border-dashed border-black/12.5 dark:border-white/12.5" />;

export default function Home() {
  return (
    <main className="mx-auto size-full max-w-300 p-4 md:p-8">
      <div className="relative mt-20 flex size-full flex-col items-center justify-center">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="relative size-full border border-black/15 dark:border-white/15">
            <div className="grid size-full grid-cols-3">
              <DashedLine />
              <DashedLine />
              <Crosshair className="-top-[0.8rem] -left-[0.8rem]" />
              <Crosshair className="-right-[0.8rem] -bottom-[0.8rem]" />
            </div>
          </div>
        </div>
        <div className="relative z-10 flex size-full flex-col gap-6 px-40 pt-20 pb-40">
          Main content will here.
          <VideoPlayer />
          <CodePreview />
        </div>
      </div>
    </main>
  );
}
