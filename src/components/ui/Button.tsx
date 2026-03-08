import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow transition motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60";

const variantStyles: Record<Variant, string> = {
  primary: "bg-bw-primary text-white hover:brightness-110",
  secondary: "bg-bw-secondary text-white hover:brightness-110 focus-visible:ring-bw-secondary/60",
  ghost: "border border-bw-lightgray text-bw-navy hover:bg-bw-lightblue",
};

export default function Button({ variant = "primary", className, href, children, ...rest }: ButtonProps) {
  const classes = cx(
    baseStyles,
    variantStyles[variant],
    "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
    className
  );
  if (href) {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    );
  }
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
