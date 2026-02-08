import { TimeQuarter02Icon, SourceCodeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Info({ PublishedAt, ReadTime, SourceLink }: { PublishedAt: string; ReadTime: string; SourceLink: string }) {
  return (
    <section className="mt-5 flex w-full items-center justify-between px-0 max-[56rem]:px-4">
      <div className="flex items-center gap-5 max-sm:gap-3.5">
        <span className="text-muted-foreground flex items-center gap-2 truncate text-xs select-none md:text-sm">
          <HugeiconsIcon width={20} height={20} strokeWidth={1.5} icon={TimeQuarter02Icon} className="size-4 md:size-5" />
          {ReadTime} read
        </span>
        <Link
          href={SourceLink}
          className="bg-background hover:bg-input flex items-center justify-center gap-2 truncate overflow-hidden rounded-full border border-black/15 py-2 pr-4 pl-3 text-xs text-sky-600 select-none hover:border-transparent max-[56rem]:pr-2.5 max-[56rem]:pl-2.5 md:text-sm dark:border-white/15 dark:text-sky-400"
        >
          <HugeiconsIcon width={20} height={20} strokeWidth={1.75} icon={SourceCodeIcon} className="size-4 md:size-5" />
          <span className="max-[25rem]:hidden">Source code</span>
        </Link>
      </div>
      <span className="text-muted-foreground truncate text-xs select-none md:text-sm">{PublishedAt}</span>
    </section>
  );
}
