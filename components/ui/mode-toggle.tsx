"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Sun, Moon } from "lucide-react";

const IconSwitch = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }
>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    className={`inline-flex h-5 w-9 sm:h-6 sm:w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
      checked ? "bg-accent" : "bg-black"
    } ${className || ""}`}
    role="switch"
    aria-checked={checked}
    data-state={checked ? "checked" : "unchecked"}
    onClick={() => onCheckedChange?.(!checked)}
    ref={ref}
    {...props}
  >
    <span
      className={`pointer-events-none flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform ${
        checked ? "translate-x-5 sm:translate-x-5" : "translate-x-0"
      }`}
    >
      {checked ? (
        <Moon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground" />
      ) : (
        <Sun className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground" />
      )}
    </span>
  </button>
));

IconSwitch.displayName = "IconSwitch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = React.useState(theme === "dark");

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <IconSwitch checked={enabled} onCheckedChange={handleToggle} />
    </div>
  );
}
