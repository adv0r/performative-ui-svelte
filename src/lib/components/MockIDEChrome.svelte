<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLDivElement> & {
    filename?: string;
    thinking?: string | false;
    children?: Snippet;
  };

  let { filename, thinking, class: className = "", children, ...rest }: Props = $props();
</script>

<div class={cn("pui-ide__chrome", className)} {...rest}>
  <span class="pui-ide__dot pui-ide__dot--red"></span>
  <span class="pui-ide__dot pui-ide__dot--yellow"></span>
  <span class="pui-ide__dot pui-ide__dot--green"></span>
  {#if filename}
    <span class="pui-ide__tab">{filename}</span>
  {/if}
  {@render children?.()}
  {#if thinking !== false}
    <span class="pui-ide__thinking">
      <span class="pui-spinner"></span>
      <span>{thinking ?? "AI is writing..."}</span>
    </span>
  {/if}
</div>
