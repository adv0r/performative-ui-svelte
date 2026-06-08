<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLSpanElement> & {
    color?: string;
    static?: boolean;
  };

  let {
    color,
    static: isStatic = false,
    class: className = "",
    style = "",
    ...rest
  }: Props = $props();

  let mergedStyle = $derived(color ? `${style};background:${color};color:${color}` : style);
</script>

<span
  aria-hidden="true"
  class={cn("pui-dot", !isStatic && "pui-dot--pulse", className)}
  style={mergedStyle}
  {...rest}
></span>
