<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { IdeToken } from "../types.js";
  import { cn } from "../utils/cn.js";
  import MockIDEChrome from "./MockIDEChrome.svelte";
  import MockIDEBody from "./MockIDEBody.svelte";

  type Props = HTMLAttributes<HTMLDivElement> & {
    filename?: string;
    tokens?: IdeToken[];
    loop?: boolean;
    charMs?: [number, number];
    thinkingLabel?: string | false;
    children?: Snippet;
  };

  let {
    filename,
    tokens = [],
    loop = true,
    charMs = [14, 42],
    thinkingLabel = "AI is writing...",
    class: className = "",
    children,
    ...rest
  }: Props = $props();
</script>

<div data-theme="dark" class={cn("pui-ide", className)} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <MockIDEChrome {filename} thinking={thinkingLabel} />
    <MockIDEBody {tokens} {loop} {charMs} />
  {/if}
</div>
