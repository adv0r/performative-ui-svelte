<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLSpanElement> & {
    glyph?: string;
    solid?: boolean;
    static?: boolean;
  };

  let {
    glyph = "✦",
    solid = false,
    static: isStatic = false,
    class: className = "",
    ...rest
  }: Props = $props();
</script>

<span
  aria-hidden="true"
  class={cn("pui-sparkle", !isStatic && "pui-sparkle--blink", solid && "pui-sparkle--solid", className)}
  {...rest}
>
  {glyph}
</span>
