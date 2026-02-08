import { ThemeSwitchProvider } from "@/libs/next-theme";
import { Header } from "@/designs/components/header";
import { MotionLazy } from "@/libs/motion-lazy";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "@/designs/styles/globals.css";

const inter = Inter({ variable: "--inter-font", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Lab • Best frontend engineering edge cases",
  description: "Frontend Lab",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} relative size-full overflow-x-hidden antialiased`}>
        <ThemeSwitchProvider>
          <MotionLazy>
            <Header />
            {children}
          </MotionLazy>
        </ThemeSwitchProvider>
      </body>
    </html>
  );
}
