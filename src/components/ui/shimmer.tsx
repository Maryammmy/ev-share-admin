import type { HTMLAttributes } from "react";

import { cn } from "@/lib";

type ShimmerProps = HTMLAttributes<HTMLDivElement>;

function Shimmer({ className, ...props }: ShimmerProps) {
  return (
    <div
      className={cn("rounded-full bg-neutral-100 animate-pulse", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Shimmer;
