"use client";

import { Switch, SwitchIndicator, SwitchWrapper } from "@/designs/elements/shadcn/switch";
import { Sun01Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { cn } from "@/libs/cn";

export function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleToggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <div className="flex items-center">
      <SwitchWrapper permanent={true}>
        <Switch size="xl" checked={resolvedTheme === "dark"} onCheckedChange={handleToggle} />
        <SwitchIndicator state="on">
          <HugeiconsIcon icon={Sun01Icon} className={cn(resolvedTheme === "dark" ? "text-white/75" : "text-muted-foreground", "size-4")} />
        </SwitchIndicator>
        <SwitchIndicator state="off">
          <HugeiconsIcon icon={Moon02Icon} className={cn(resolvedTheme === "dark" ? "text-black/75" : "text-muted-foreground", "size-4")} />
        </SwitchIndicator>
      </SwitchWrapper>
    </div>
  );
}
