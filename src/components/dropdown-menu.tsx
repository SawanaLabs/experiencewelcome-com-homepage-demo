"use client";

import { Menu } from "@base-ui/react/menu";
import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const DropdownMenu = Menu.Root;
export const DropdownMenuPortal = Menu.Portal;

type DropdownMenuTriggerProps = Omit<
  ComponentProps<typeof Menu.Trigger>,
  "className"
> & {
  className?: string;
};

export function DropdownMenuTrigger({
  className,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <Menu.Trigger
      className={cn(
        "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

type DropdownMenuContentProps = Omit<
  ComponentProps<typeof Menu.Popup>,
  "className"
> &
  Pick<
    ComponentProps<typeof Menu.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    className?: string;
  };

export function DropdownMenuContent({
  align = "end",
  alignOffset,
  className,
  side = "bottom",
  sideOffset = 8,
  ...props
}: DropdownMenuContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        align={align}
        alignOffset={alignOffset}
        className="isolate z-[1000] outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <Menu.Popup
          className={cn(
            "relative z-[1000] max-h-[22rem] min-w-40 overflow-y-auto overflow-x-hidden rounded-lg border border-[rgba(255,255,255,0.14)] bg-[rgba(10,10,10,0.98)] p-1 text-[#ffffff] shadow-[0_18px_55px_rgba(0,0,0,0.45)] outline-none backdrop-blur-xl",
            className
          )}
          data-slot="dropdown-menu-content"
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

type DropdownMenuGroupProps = Omit<
  ComponentProps<typeof Menu.Group>,
  "className"
> & {
  className?: string;
};

export function DropdownMenuGroup({
  className,
  ...props
}: DropdownMenuGroupProps) {
  return (
    <Menu.Group
      className={cn("flex flex-col gap-1", className)}
      data-slot="dropdown-menu-group"
      {...props}
    />
  );
}

type DropdownMenuItemProps = Omit<
  ComponentProps<typeof Menu.Item>,
  "className"
> & {
  className?: string;
  inset?: boolean;
};

export function DropdownMenuItem({
  className,
  inset,
  ...props
}: DropdownMenuItemProps) {
  return (
    <Menu.Item
      className={cn(
        "relative flex min-h-10 cursor-default select-none items-center gap-2 rounded-md px-3 py-2 text-[14px] leading-5 outline-none transition-colors hover:bg-[rgba(255,255,255,0.1)] data-[disabled]:pointer-events-none data-[highlighted]:bg-[rgba(255,255,255,0.1)] data-[inset]:pl-7 data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-inset={inset}
      data-slot="dropdown-menu-item"
      {...props}
    />
  );
}

type DropdownMenuLinkItemProps = Omit<
  ComponentProps<typeof Menu.LinkItem>,
  "className"
> & {
  className?: string;
};

export function DropdownMenuLinkItem({
  className,
  closeOnClick = true,
  ...props
}: DropdownMenuLinkItemProps) {
  return (
    <Menu.LinkItem
      className={cn(
        "relative flex min-h-10 cursor-default select-none items-center justify-between gap-3 rounded-md px-3 py-2 text-[14px] leading-5 outline-none transition-colors hover:bg-[rgba(255,255,255,0.1)] data-[disabled]:pointer-events-none data-[highlighted]:bg-[rgba(255,255,255,0.1)] data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      closeOnClick={closeOnClick}
      data-slot="dropdown-menu-link-item"
      {...props}
    />
  );
}

type DropdownMenuRadioGroupProps = ComponentProps<typeof Menu.RadioGroup>;

export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  return <Menu.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

type DropdownMenuRadioItemProps = Omit<
  ComponentProps<typeof Menu.RadioItem>,
  "className"
> & {
  className?: string;
  inset?: boolean;
};

export function DropdownMenuRadioItem({
  children,
  className,
  closeOnClick = true,
  inset,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <Menu.RadioItem
      className={cn(
        "relative flex min-h-10 cursor-default select-none items-center gap-2 rounded-md py-2 pr-9 pl-3 text-[14px] leading-5 outline-none transition-colors hover:bg-[rgba(255,255,255,0.1)] data-[disabled]:pointer-events-none data-[highlighted]:bg-[rgba(255,255,255,0.1)] data-[inset]:pl-7 data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      closeOnClick={closeOnClick}
      data-inset={inset}
      data-slot="dropdown-menu-radio-item"
      {...props}
    >
      <span
        className="pointer-events-none absolute right-3 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <Menu.RadioItemIndicator>
          <CheckIcon aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </Menu.RadioItemIndicator>
      </span>
      {children}
    </Menu.RadioItem>
  );
}

type DropdownMenuSeparatorProps = Omit<
  ComponentProps<typeof Menu.Separator>,
  "className"
> & {
  className?: string;
};

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <Menu.Separator
      className={cn("-mx-1 my-1 h-px bg-[rgba(255,255,255,0.12)]", className)}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
}
