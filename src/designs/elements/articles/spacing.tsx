export function Spacing() {
  return (
    <span className="after:inset-ring-border relative h-10 w-full overflow-hidden rounded-lg bg-black/4 bg-[radial-gradient(var(--pattern-fg)_1px,transparent_0)] bg-size-[10px_10px] bg-fixed pt-8 pl-8 [--pattern-fg:var(--color-black)]/5 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring max-[56rem]:rounded-none after:max-[56rem]:rounded-none max-sm:pt-4 max-sm:pl-4 md:h-20 dark:bg-white/4 dark:[--pattern-fg:var(--color-white)]/10" />
  );
}
