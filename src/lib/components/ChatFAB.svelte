<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../utils/cn.js";
  import Sparkle from "./Sparkle.svelte";
  import { setChatFABClose } from "./chat-fab-context.js";

  type Props = {
    label?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    popover?: Snippet;
    class?: unknown;
    onclick?: (event: MouseEvent) => void;
    [key: string]: unknown;
  };

  let {
    label = "Ask AI",
    open,
    defaultOpen = false,
    onOpenChange,
    popover,
    class: className = "",
    onclick,
    ...rest
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let internalOpen = $state(defaultOpen);
  let isOpen = $derived(open !== undefined ? open : internalOpen);

  function setOpen(next: boolean) {
    if (open === undefined) internalOpen = next;
    onOpenChange?.(next);
  }

  function close() {
    setOpen(false);
  }

  function handleClick(e: MouseEvent) {
    onclick?.(e);
    setOpen(!isOpen);
  }

  setChatFABClose(close);
</script>

<button
  class={cn("pui-fab", className)}
  onclick={handleClick}
  aria-expanded={isOpen}
  {...rest}
>
  <Sparkle />
  <span>{label}</span>
</button>

{#if isOpen}
  <div role="dialog" class="pui-fab-popover">
    {@render popover?.()}
  </div>
{/if}
