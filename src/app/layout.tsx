import { ThemeSwitchProvider } from "@/libs/next-theme";
import { Header } from "@/designs/components/header";
import { Footer } from "@/designs/components/footer";
import { MotionLazy } from "@/libs/motion-lazy";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "@/designs/styles/globals.css";

const inter = Inter({ variable: "--inter-font", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Lab • Best frontend engineering edge cases",
  description:
    "A repository of real-world frontend edge cases, systems engineering, and big-tech architectural patterns. Bridging the gap between feature implementation and scalable architecture.",
  keywords: ["Frontend Engineering", "React 19", "Next.js 16", "System Design", "Performance Optimization", "Scalability", "Edge Cases"],
  icons: {
    icon: [
      { media: "(prefers-color-scheme: light)", url: "/favicon-dark.svg" },
      { media: "(prefers-color-scheme: dark)", url: "/favicon-light.svg" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} relative grid size-full min-h-dvh grid-rows-[auto_1fr_auto] overflow-x-hidden antialiased`}>
        <ThemeSwitchProvider>
          <MotionLazy>
            <Header />
            {children}
            <Footer />
          </MotionLazy>
        </ThemeSwitchProvider>
      </body>
    </html>
  );
}
