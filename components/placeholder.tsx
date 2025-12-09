import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement, ReactElement } from "react";
import { cn } from "@/lib/utils";

type PlaceholderProps = {
  label: string;
  icon?: ReactElement<any>;
  button?: ReactElement<any>;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button,
}: PlaceholderProps) => {
  const renderedIcon =
    icon &&
    cloneElement(icon, {
      className: cn("w-16 h-16 text-white", (icon.props as any).className),
    });

  const renderedButton =
    button &&
    cloneElement(button, {
      className: cn("h-10", (button.props as any).className),
    });

  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {renderedIcon}
      <h2 className="text-lg text-center text-white">{label}</h2>
      {renderedButton}
    </div>
  );
};

export { Placeholder };
