"use client";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./ui/sidebar";

interface CustomSidebarTriggerProps extends React.ComponentProps<typeof Button> {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  direction?: "left" | "right";
}

export function CustomSidebarTrigger({
  className,
  onClick,
  direction = "left",
  ...props
}: CustomSidebarTriggerProps) {
  const { toggleSidebar, state } = useSidebar();
  const icon =
    state === "expanded"
      ? direction === "left"
        ? <PanelLeftClose />
        : <PanelRightClose />
      : direction === "left"
      ? <PanelRightClose />
      : <PanelLeftClose />;

  return (
    <Button
      data-sidebar="custom-trigger"
      data-slot="sidebar-custom-trigger"
      data-direction={direction}
      variant="ghost"
      size="icon"
      className={cn("size-9 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:bg-blue-100/60 dark:hover:bg-blue-900/60 transition-all duration-200 flex items-center justify-center group", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <span className="transition-transform duration-200 group-hover:scale-110 group-hover:text-primary text-xl">{icon}</span>
      <span className="sr-only">Toggle {direction} Panel</span>
    </Button>
  );
}
