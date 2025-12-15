import { cn } from "@/lib/utils";
import { px } from "./utils";
import { CYPRESS_GOLD_TEXT, CYPRESS_GOLD_GLOW } from "@/lib/cypress-gold";

export const Pill = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const polyRoundness = 6;
  const hypotenuse = polyRoundness * 2;
  const hypotenuseHalf = polyRoundness / 2 - 1.5;

  return (
    <div
      style={{
        "--poly-roundness": px(polyRoundness),
      } as React.CSSProperties}
      className={cn(
        "relative bg-[#262626]/50 transform-gpu font-mono text-sm",
        "inline-flex items-center justify-center px-3 h-8",
        "border border-border backdrop-blur-xs",
        "[clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_var(--poly-roundness),100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,var(--poly-roundness)_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]",
        className
      )}
    >
      {/* Corner cuts */}
      {["left", "right"].map((side) =>
        ["top", "bottom"].map((vert) => (
          <span
            key={`${side}-${vert}`}
            style={
              {
                "--h": px(hypotenuse),
                "--hh": px(hypotenuseHalf),
              } as React.CSSProperties
            }
            className={cn(
              "absolute w-[var(--h)] h-[2px] bg-border",
              vert === "top" ? "top-[var(--hh)]" : "bottom-[var(--hh)]",
              side === "left"
                ? "left-[var(--hh)] -translate-x-1/2"
                : "right-[var(--hh)] translate-x-1/2",
              vert === side ? "rotate-45" : "-rotate-45"
            )}
          />
        ))
      )}

      {/* Gold status dot */}
      <span
        className={cn(
          "inline-block size-2.5 rounded-full mr-2",
          CYPRESS_GOLD_GLOW
        )}
      />

      {/* Gold label */}
      <span className={cn("tracking-wide", CYPRESS_GOLD_TEXT)}>
        {children}
      </span>
    </div>
  );
};
