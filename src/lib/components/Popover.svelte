<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import { cn } from "../utils/cn.js";

  type Props = {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    timer?: number;
    title?: string;
    closeLabel?: string | false;
    closeOnEscape?: boolean;
    closeOnBackdrop?: boolean;
    class?: string;
    children?: Snippet;
  };

  let {
    open,
    defaultOpen = false,
    onOpenChange,
    timer = 0,
    title,
    closeLabel = "Maybe later",
    closeOnEscape = false,
    closeOnBackdrop = false,
    class: className = "",
    children
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let internalOpen = $state(defaultOpen);
  let isOpen = $derived(open !== undefined ? open : internalOpen);

  function setOpen(next: boolean) {
    if (open === undefined) internalOpen = next;
    onOpenChange?.(next);
  }

  function backdrop() {
    if (closeOnBackdrop) setOpen(false);
  }

  function keydown(e: KeyboardEvent) {
    if (e.key === "Escape" && closeOnEscape) {
      e.preventDefault();
      setOpen(false);
    }
  }

  onMount(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (timer > 0 && !isOpen) timeout = setTimeout(() => setOpen(true), timer);
    document.addEventListener("keydown", keydown, true);
    return () => {
      if (timeout) clearTimeout(timeout);
      document.removeEventListener("keydown", keydown, true);
    };
  });
</script>

{#if isOpen}
  <div class="pui-popover-overlay" role="presentation">
    <button
      type="button"
      class="pui-popover-backdrop"
      aria-label="Close popover"
      onclick={backdrop}
    ></button>
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabindex="-1"
      class={cn("pui-popover", className)}
      onkeydown={(e) => e.stopPropagation()}
    >
      {#if title}
        <h2 class="pui-popover__title">{title}</h2>
      {/if}
      <div class="pui-popover__body">
        {@render children?.()}
      </div>
      {#if closeLabel !== false}
        <button type="button" class="pui-popover__dismiss" onclick={() => setOpen(false)}>
          {closeLabel}
        </button>
      {/if}
    </div>
  </div>
{/if}
