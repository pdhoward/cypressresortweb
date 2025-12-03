// components/logo.tsx
import { ComponentProps } from "react";
import CypressIconSnow from "@/assets/icons/CypressIconSnow";

export function Logo(props: ComponentProps<"svg">) {
  return (
    <CypressIconSnow width={64} height={64} />
  );
}
