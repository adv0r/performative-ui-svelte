<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { AsciiFieldOptions } from "../types.js";
  import { asciiField } from "../actions/ascii-field.js";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLDivElement> &
    AsciiFieldOptions & {
      variant?: "panel" | "bare";
    };

  let {
    variant = "panel",
    cols,
    rows,
    fontSize,
    fontFamily,
    charRamp,
    colorful,
    palette,
    baseOpacity,
    reactive,
    rippleStrength,
    rippleRadius,
    spotlightOpacity,
    spotlightRadius,
    frameMs,
    class: className = "",
    ...rest
  }: Props = $props();

  let options = $derived({
    cols,
    rows,
    fontSize,
    fontFamily,
    charRamp,
    colorful,
    palette,
    baseOpacity,
    reactive,
    rippleStrength,
    rippleRadius,
    spotlightOpacity,
    spotlightRadius,
    frameMs
  });
</script>

<div
  class={cn("pui-ascii", variant === "panel" && "pui-ascii--panel", className)}
  aria-hidden="true"
  {...rest}
>
  <canvas use:asciiField={options}></canvas>
</div>
