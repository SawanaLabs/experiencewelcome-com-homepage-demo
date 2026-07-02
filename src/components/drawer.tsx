"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Drawer = DrawerPrimitive.Root;
export const DrawerPortal = DrawerPrimitive.Portal;
export const DrawerClose = DrawerPrimitive.Close;

type DrawerTriggerProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Trigger>,
  "className"
> & {
  className?: string;
};

export function DrawerTrigger({ className, ...props }: DrawerTriggerProps) {
  return (
    <DrawerPrimitive.Trigger
      className={cn(
        "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
      data-slot="drawer-trigger"
      {...props}
    />
  );
}

type DrawerBackdropProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Backdrop>,
  "className"
> & {
  className?: string;
};

export function DrawerBackdrop({ className, ...props }: DrawerBackdropProps) {
  return (
    <DrawerPrimitive.Backdrop
      className={cn(
        "pointer-events-auto fixed inset-0 z-[2147483645] bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className
      )}
      data-slot="drawer-backdrop"
      {...props}
    />
  );
}

type DrawerContentProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Popup>,
  "className"
> & {
  backdropClassName?: string;
  className?: string;
  portalProps?: ComponentProps<typeof DrawerPrimitive.Portal>;
  viewportClassName?: string;
};

export function DrawerContent({
  backdropClassName,
  children,
  className,
  portalProps,
  viewportClassName,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal {...portalProps}>
      <DrawerBackdrop className={backdropClassName} />
      <DrawerPrimitive.Viewport
        className={cn(
          "pointer-events-auto fixed inset-0 z-[2147483646] flex items-end justify-center p-3 outline-none sm:p-5",
          viewportClassName
        )}
        data-slot="drawer-viewport"
      >
        <DrawerPrimitive.Popup
          className={cn(
            "pointer-events-auto w-full max-w-[440px] overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.14)] bg-[rgba(12,10,10,0.96)] text-[#ffffff] shadow-[0_24px_90px_rgba(0,0,0,0.58)] outline-none backdrop-blur-2xl transition-all duration-300 ease-out data-[ending-style]:translate-y-6 data-[starting-style]:translate-y-6 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
            className
          )}
          data-slot="drawer-content"
          {...props}
        >
          <DrawerPrimitive.Content className="flex max-h-[calc(100svh-1.5rem)] flex-col">
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

type DrawerHeaderProps = ComponentProps<"div">;

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-6 pb-4", className)}
      data-slot="drawer-header"
      {...props}
    />
  );
}

type DrawerFooterProps = ComponentProps<"div">;

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn("flex flex-col gap-3 p-6 pt-4", className)}
      data-slot="drawer-footer"
      {...props}
    />
  );
}

type DrawerTitleProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Title>,
  "className"
> & {
  className?: string;
};

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title
      className={cn("font-semibold text-[18px] leading-6", className)}
      data-slot="drawer-title"
      {...props}
    />
  );
}

type DrawerDescriptionProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Description>,
  "className"
> & {
  className?: string;
};

export function DrawerDescription({
  className,
  ...props
}: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-[14px] text-white/62 leading-5", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}
