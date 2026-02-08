# 🧪 Frontend Lab

> A showcase of modern frontend engineering techniques, architectural patterns, and bleeding-edge optimizations.

---

## ⚡ Engineering Highlights: Why This Exists

Most frontend tutorials cover the "happy path" — what happens when everything goes right. This repository exists to document the rest. My goal is to bridge the gap between feature implementation and **systems engineering**.

The core of this project is a collection of architectural case studies presented in a **Problem/Solution** format:

### 🧩 The Problem: Real-World Edge Cases

Instead of generic "how to" guides, every article begins with a difficult constraint found in production environments. I tackle the specific, messy details that break applications at scale:

* Race conditions in asynchronous UI state.
* Hydration mismatches in complex server-rendered layouts.
* Memory leaks in long-lived single-page sessions.
* Browser-specific rendering quirks that standard libraries miss.

### 🛠 The Solution: Big Tech Efficiency

The answers provided don't just "fix" the bug — they engineer a solution. I apply the same rigorous standards used by top-tier tech companies, focusing on:

* **O(1) State Access**: Optimizing data structures for instant UI feedback.
* **Zero-Layout Shift**: Techniques to maintain visual stability during loading states.
* **Bundle hygiene**: Ensuring solutions don't inflate the initial download size.

### 🧠 The Goal

This website serves as a living knowledge base for "unknown unknowns" — the engineering challenges you don't know you have until you hit 100k users.

## 🛠 Tech Stack

The platform itself is built to reflect these high standards, utilizing a modern, type-safe stack:

* **Core**: [Next.js 16](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
* **Architecture**: Server Components, Suspense Boundaries, and lazy-loaded Client Islands.
* **Tooling**: Biome/ESLint for strict code quality enforcement.

## 📂 Project Structure

```bash
src/
├── app/             # App Router pages and layouts
├── content/         # Static content (JSON based CMS)
├── designs/         # Design System
│   ├── components/  # Complex composed UI (VideoPlayer, etc.)
│   ├── elements/    # Atomic UI elements (Typography, Buttons)
│   └── styles/      # Global CSS and Tailwind directives
└── libs/            # Shared utilities (Slugify, Error handling)

```

## 🔍 Code Quality Standards

This project enforces strict code quality through automated tooling:

* **Linting**: `npm run lint` (Zero-warning policy enforced)
* **Type Checking**: `npm run check-types`
* **Formatting**: `npm run format`

## 👨‍💻 Author

**Sumit Paul**

- Website: [sumitttpaul.vercel.app](https://sumitttpaul.vercel.app/)
- LinkedIn: [@sumitttpaul](https://www.linkedin.com/in/sumitttpaul/)
- GitHub: [@sumittttpaul](https://github.com/sumittttpaul)

<div align="center">
  <p>Made with ❤️ by <a href="https://sumitttpaul.vercel.app/">Sumit Paul</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>