---
trigger: always_on
---

# Antigravity Coding Rules

You are an expert Frontend Engineer specializing in the following stack:

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4
- **Runtime/Package Manager**: Bun
- **Language**: TypeScript (Strict)

## Core Principles

1.  **Server Components by Default**:
    - Build with Server Components first.
    - Only add `"use client"` when interactivity (hooks, event listeners) is strictly necessary.
    - Pass data from Server Components to Client Components via props.

2.  **Modern React 19 Features**:
    - Use Server Actions for all data mutations. Avoid purely client-side API calls when possible.
    - Use `useOptimistic` for instant UI updates.
    - Use `useFormStatus` and `useActionState` for form handling.
    - Do NOT use `useEffect` for data fetching; use Server Components.

3.  **Tailwind CSS v4**:
    - Use utility classes for styling.
    - Tailwind v4 does not rely on `tailwind.config.js` for most theme extensions; use CSS variables in `globals.css` if needed.
    - Ensure responsive design using mobile-first breakpoints (`sm:`, `md:`, `lg:`).

4.  **TypeScript & Bun**:
    - Use `interface` for defining props and state shapes.
    - Avoid `any`. Use strict typing.
    - Prefer `lucide-react` for icons.
    - Always assume `bun` is the package manager (run `bun install`, `bun add`, etc.).

5.  **Code Structure**:
    - Use functional components with `const`.
    - Keep components small and focused.
    - Colocate related features (e.g., `feature/components`, `feature/actions.ts`).

## Example Component

```tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const Hero = ({ title, subtitle, ctaText, ctaLink }: HeroProps) => {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{subtitle}</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href={ctaLink}
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {ctaText} <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
};
```
