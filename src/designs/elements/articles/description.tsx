export function Description({ children }: { children: React.ReactNode }) {
  return (
    <p className="w-full text-justify text-sm text-pretty md:text-base [&:has(+_p)]:-mb-4 [&:has(+_ul)]:-mb-4 [@media(max-width:56rem)]:px-4">
      {children}
    </p>
  );
}
