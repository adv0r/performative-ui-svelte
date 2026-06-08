<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ChatRole } from "../types.js";
  import { cn } from "../utils/cn.js";
  import Sparkle from "./Sparkle.svelte";

  type Props = HTMLAttributes<HTMLDivElement> & {
    role: ChatRole;
    agent?: string;
    thinking?: string | false;
    icon?: Snippet | false;
    children?: Snippet;
  };

  let {
    role,
    agent,
    thinking,
    icon,
    class: className = "",
    children,
    ...rest
  }: Props = $props();
</script>

<div class={cn("pui-bubble", role === "user" ? "pui-bubble--user" : "pui-bubble--ai", className)} {...rest}>
  {#if role === "ai" && (agent || thinking !== false || icon !== false)}
    <div class="pui-bubble__meta">
      {#if icon !== false}
        {#if icon}
          {@render icon()}
        {:else}
          <Sparkle />
        {/if}
      {/if}
      {#if agent}
        <span>{agent}</span>
      {/if}
      {#if thinking !== false}
        <span class="pui-bubble__thinking-pill">
          <span class="pui-spinner pui-spinner--sm"></span>
          <span>{thinking ?? "thinking..."}</span>
        </span>
      {/if}
    </div>
  {/if}
  <div class="pui-bubble__stream">{@render children?.()}</div>
</div>
