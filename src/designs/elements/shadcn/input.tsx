import { cn } from "@/libs/cn";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      autoCorrect="off"
      autoComplete="off"
      className={cn(
        "file:text-foreground md:hover:bg-input-hover placeholder:text-muted-foreground/70 focus-visible:border-input-2 focus-visible:ring-input-2 bg-input-2 file:bg-input-2 flex h-12 min-h-12 w-full min-w-0 rounded-xl px-3.5 py-3 text-sm font-medium shadow-xs transition-all duration-200 ease-out outline-none file:inline-flex file:border-0 file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base file:md:text-base",
        type === "search" &&
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
        type === "file" &&
          "text-muted-foreground/70 file:border-input file:text-foreground file:bg-input-2 p-0 pr-3 italic file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:px-3 file:text-sm file:font-medium file:not-italic",
        className,
      )}
      {...props}
    />
  );
}
