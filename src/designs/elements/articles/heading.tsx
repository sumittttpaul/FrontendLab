import { Link02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Heading({ children, className }: React.PropsWithChildren & { className?: string }) {
  return (
    <h2
      id={String(children)}
      className={`text-muted-foreground/60 flex w-full scroll-mt-19.5 items-center gap-2 truncate text-xs text-[1.2rem] leading-6 font-bold select-none max-[56rem]:px-4 sm:text-[1.3rem] sm:leading-7 md:scroll-mt-21 md:gap-4 md:text-[1.4rem] md:leading-8 [&:has(+_p)]:-mb-4 md:[&:has(+_p)]:-mb-8 [@media(width_>=_56rem)]:text-[1.8rem] [@media(width_>=_56rem)]:leading-9 ${className}`}
    >
      {children}
      <Link href={"#" + children} className="group">
        <HugeiconsIcon
          width={24}
          height={24}
          icon={Link02Icon}
          strokeWidth={2}
          className="md:group-hover:text-foreground hidden size-7 transition-colors duration-200 ease-in-out md:block"
        />
        <HugeiconsIcon
          width={24}
          height={24}
          icon={Link02Icon}
          strokeWidth={2.75}
          className="md:group-hover:text-foreground size-4.5 transition-colors duration-200 ease-in-out md:hidden"
        />
      </Link>
    </h2>
  );
}
