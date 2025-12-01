// components/logo-image.tsx
import Image, { ImageProps } from "next/image";

export function LogoImage(props: Omit<ImageProps, "src" | "alt">) {
  return (
    <Image
      src="./cypresslogocircle.png"
      alt="Cypress logo"
      width={props.width ?? 256}
      height={props.height ?? 256}
      {...props}
    />
  );
}
