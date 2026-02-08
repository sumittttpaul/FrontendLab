import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export function Title({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-8">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground group flex items-center gap-x-2 text-xs font-medium select-none md:text-sm"
        href="https://www.linkedin.com/in/sumitttpaul"
      >
        <HugeiconsIcon
          width={20}
          height={20}
          strokeWidth={2}
          icon={ArrowLeft02Icon}
          className="size-4 transition-transform duration-300 ease-in-out md:size-5 md:group-hover:-translate-x-2"
        />
        LinkedIn
      </Link>
      <h1 className="max-w-md text-center text-[1.4rem] leading-8 font-bold max-[56rem]:px-4 sm:text-3xl sm:leading-10 [@media(width_>=_56rem)]:max-w-full [@media(width_>=_56rem)]:text-[3.1rem] [@media(width_>=_56rem)]:leading-14">
        {children}
      </h1>
      <div className="flex items-center gap-2.5 max-[20rem]:flex-col max-[20rem]:gap-1 md:gap-3">
        <div className="flex items-center gap-2">
          <Image src="/sumit-paul.jpg" alt="Avatar" width={22} height={22} className="size-4.5 rounded-full md:size-5.5" />
          <p className="text-xs font-medium select-none md:text-sm">Sumeet Kumar Paul</p>
        </div>
        <p className="text-muted-foreground text-xs font-medium select-none max-[20rem]:ml-5 md:text-sm">Frontend Engineer</p>
      </div>
    </div>
  );
}
