// assets/icons/CypressLogo.tsx
import Image, { ImageProps } from "next/image";
import cypresslogo from "../images/cypresslogo.svg";

type Props = Omit<ImageProps, "src" | "alt">;

export function CypressLogo(props: Props) {
  return (
    <div className="overflow-hidden rounded-full">
      <Image
        src={cypresslogo}
        alt="Cypress logo"
        {...props}
        className={`object-cover ${props.className ?? ""}`}
      />
    </div>
  );
}
