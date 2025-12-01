// components/logo.tsx
import { ComponentProps } from "react";
import { CypressBadge } from "@/assets/icons/CypressBadge";

export function Logo(props: ComponentProps<"svg">) {
  return (
    <CypressBadge width={64} height={64} />
  );
}
