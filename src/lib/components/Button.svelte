<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ButtonSize, ButtonVariant } from "../types.js";
  import { cn } from "../utils/cn.js";
  import Sparkle from "./Sparkle.svelte";

  type Props = {
    as?: "button" | "a" | string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    sparkle?: boolean;
    loading?: boolean;
    block?: boolean;
    disabled?: boolean;
    children?: Snippet;
    class?: unknown;
    [key: string]: unknown;
  };

  let {
    as = "button",
    variant = "glow",
    size = "md",
    sparkle = false,
    loading = false,
    block = false,
    disabled = false,
    class: className = "",
    children,
    ...rest
  }: Props = $props();

  let isButton = $derived(as === "button");
</script>

{#if isButton}
  <button
    class={cn(
      "pui-btn",
      `pui-btn--${variant}`,
      size !== "md" && `pui-btn--${size}`,
      block && "pui-btn--block",
      className
    )}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    {...rest}
  >
    {#if loading}
      <span class="pui-btn__spinner" aria-hidden="true"></span>
    {/if}
    <span>{@render children?.()}</span>
    {#if sparkle}
      <Sparkle />
    {/if}
  </button>
{:else}
  <svelte:element
    this={as}
    class={cn(
      "pui-btn",
      `pui-btn--${variant}`,
      size !== "md" && `pui-btn--${size}`,
      block && "pui-btn--block",
      className
    )}
    aria-busy={loading || undefined}
    {...rest}
  >
    {#if loading}
      <span class="pui-btn__spinner" aria-hidden="true"></span>
    {/if}
    <span>{@render children?.()}</span>
    {#if sparkle}
      <Sparkle />
    {/if}
  </svelte:element>
{/if}
