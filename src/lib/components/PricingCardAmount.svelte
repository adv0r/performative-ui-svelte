<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLDivElement> & { unit?: string; children?: Snippet };
  let { unit, class: className = "", children, ...rest }: Props = $props();
</script>

<div class={cn("pui-price__amount", className)} {...rest}>
  {@render children?.()}
  {#if unit}
    <span class="pui-price__amount-unit">{unit}</span>
  {/if}
</div>
