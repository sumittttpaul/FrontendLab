import { ThemeSwitchProvider } from "@/libs/next-theme";
import { Header } from "@/designs/components/header";
import { MotionLazy } from "@/libs/motion-lazy";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "@/designs/styles/globals.css";
import { ScrollArea } from "@/designs/elements/shadcn/scroll-area";

const inter = Inter({ variable: "--inter-font", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Lab • Best frontend engineering edge cases",
  description: "Frontend Lab",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} relative h-dvh w-full overflow-hidden antialiased`}>
        <ThemeSwitchProvider>
          <MotionLazy>
            <ScrollArea className="relative h-dvh w-full overflow-x-hidden">
              <Header />
              {children}
            </ScrollArea>
          </MotionLazy>
        </ThemeSwitchProvider>
      </body>
    </html>
  );
}
