import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative mx-auto rounded-full border text-center text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100",
        solid:
          "border-slate-200 bg-white/85 text-slate-900 shadow-sm shadow-slate-300/50 backdrop-blur-md hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800",
        primary:
          "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200/70 hover:border-blue-700 hover:bg-blue-700",
        ghost:
          "border-transparent bg-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900",
      },
      size: {
        default: "px-7 py-2",
        sm: "px-4 py-1.5 text-sm",
        lg: "px-8 py-3 sm:px-10 sm:py-3.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  neon?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, neon = true, size, variant, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn("group", buttonVariants({ variant, size }), className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 mx-auto hidden h-px w-3/4 bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          neon && "block",
        )}
      />
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-px inset-x-0 mx-auto hidden h-px w-3/4 bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-40",
          neon && "block",
        )}
      />
    </button>
  ),
);

Button.displayName = "Button";

export { Button, buttonVariants };
