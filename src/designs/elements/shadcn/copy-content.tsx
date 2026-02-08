"use client";

import { AnimatePresence, HTMLMotionProps, m } from "motion/react";
import { Tick01Icon, Copy01Icon } from "@hugeicons/core-free-icons";
import { cva, type VariantProps } from "class-variance-authority";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { cn } from "@/libs/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        muted: "bg-muted text-muted-foreground",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-white/7.5",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "size-8 rounded-lg [&_svg]:size-4",
        sm: "size-6 [&_svg]:size-3",
        md: "h-8 w-auto rounded-lg [&_svg]:size-4 px-2",
        lg: "size-12 rounded-xl [&_svg]:size-6",
        text: "h-8 [&_svg]:size-4 max-sm:[&_svg]:size-3.5 w-auto rounded-md max-sm:rounded-sm gap-2 px-2 max-sm:gap-1.5 max-sm:px-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type CopyContentProps = Omit<HTMLMotionProps<"button">, "children" | "onCopy"> &
  VariantProps<typeof buttonVariants> & {
    content?: string;
    delay?: number;
    onCopy?: (content: string) => void;
    isCopied?: boolean;
    onCopyChange?: (isCopied: boolean) => void;
    text?: string;
    textClassName?: string;
    iconClassName?: string;
  };

function CopyContent({
  content,
  text,
  className,
  textClassName,
  iconClassName,
  size,
  variant,
  delay = 3000,
  onClick,
  onCopy,
  isCopied,
  onCopyChange,
  ...props
}: CopyContentProps) {
  const [localIsCopied, setLocalIsCopied] = useState(isCopied ?? false);
  const [prevIsCopied, setPrevIsCopied] = useState(isCopied);

  if (isCopied !== prevIsCopied) {
    setPrevIsCopied(isCopied);
    setLocalIsCopied(isCopied ?? false);
  }

  const handleIsCopied = (isCopied: boolean) => {
    setLocalIsCopied(isCopied);
    onCopyChange?.(isCopied);
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isCopied) return;
    if (content) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          handleIsCopied(true);
          setTimeout(() => handleIsCopied(false), delay);
          onCopy?.(content);
        })
        .catch((error) => {
          console.error("Error copying command", error);
        });
    }
    onClick?.(e);
  };

  return (
    <m.button
      data-slot="copy-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={handleCopy}
      {...props}
    >
      <AnimatePresence mode="wait">
        <m.span
          key={localIsCopied ? "check" : "copy"}
          data-slot="copy-button-icon"
          transition={{ duration: 0.15 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <HugeiconsIcon icon={localIsCopied ? Tick01Icon : Copy01Icon} className={iconClassName} />
        </m.span>
      </AnimatePresence>
      {size === "text" && <span className={cn("truncate text-[0.8rem] select-none max-sm:text-xs", textClassName)}>{text || "Copy"}</span>}
    </m.button>
  );
}

export { CopyContent, buttonVariants, type CopyContentProps };
