import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-300 px-4 pt-5 pb-10 max-sm:flex-col max-sm:gap-y-2 sm:justify-between [@media(width>=56rem)]:px-8 [@media(width>=56rem)]:pb-12.5">
      <p className="text-foreground/60 text-sm/7 max-sm:text-xs/7">Copyright © 2026 Sumit Paul</p>
      <p className="text-foreground/60 text-sm/7 max-sm:text-xs/7">
        Design by{" "}
        <Link href="https://sumitttpaul.vercel.app/" className="underline-offset-2 hover:underline">
          Sumit Paul
        </Link>
        <span className="mx-2">•</span>
        <Link href="https://www.linkedin.com/in/sumitttpaul/" className="underline-offset-2 hover:underline">
          LinkedIn
        </Link>
      </p>
    </footer>
  );
}
