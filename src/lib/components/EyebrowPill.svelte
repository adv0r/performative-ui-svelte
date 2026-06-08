<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";
  import StatusDot from "./StatusDot.svelte";

  type Props = HTMLAttributes<HTMLSpanElement> & {
    icon?: Snippet | false;
    statusColor?: string;
    children?: Snippet;
  };

  let { icon, statusColor, class: className = "", children, ...rest }: Props = $props();
</script>

<span class={cn("pui-eyebrow", className)} {...rest}>
  {#if icon !== false}
    {#if icon}
      {@render icon()}
    {:else}
      <StatusDot color={statusColor} />
    {/if}
  {/if}
  <span>{@render children?.()}</span>
</span>
