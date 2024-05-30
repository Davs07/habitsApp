import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva(
  "transition-colors", // Clase base para todos los textos
  {
    variants: {
      variant: {
        h1: "text-5xl font-bold text-main",
        h2: "text-4xl font-semibold text-main",
        h3: "text-3xl font-medium text-primary",
        h4: "text-2xl font-medium text-muted-foreground",
        h5: "text-xl font-medium text-muted-foreground",
        plg: "text-lg font-normal text-main",
        pbase: "text-base font-normal text-secondary-foreground",
        pmd: "text-base font-light text-primary",
        psm: "text-sm font-medium text-accent-foreground",
        pxs: "text-xs font-light text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "pbase",
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        className={cn(textVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
