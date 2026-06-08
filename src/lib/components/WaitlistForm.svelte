<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";
  import Button from "./Button.svelte";

  type Props = Omit<HTMLFormAttributes, "onsubmit"> & {
    placeholder?: string;
    defaultValue?: string;
    ctaLabel?: string;
    leading?: Snippet | false;
    footnote?: string;
    onSubmit?: (email: string) => void;
  };

  let {
    placeholder = "you@startup.ai",
    defaultValue = "",
    ctaLabel = "Notify me",
    leading,
    footnote,
    onSubmit,
    class: className = "",
    ...rest
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let value = $state(defaultValue);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    onSubmit?.(value);
  }
</script>

<div class={cn("pui-waitlist-wrap", className)}>
  <form class="pui-waitlist" onsubmit={submit} {...rest}>
    {#if leading !== false}
      <span class="pui-waitlist__icon" aria-hidden="true">
        {#if leading}
          {@render leading()}
        {:else}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <path d="M3 7l9 6 9-6"></path>
          </svg>
        {/if}
      </span>
    {/if}
    <input
      class="pui-waitlist__input"
      type="email"
      {placeholder}
      bind:value
    />
    <Button type="submit" variant="solid">{ctaLabel}</Button>
  </form>
  {#if footnote}
    <div class="pui-waitlist__footnote">{footnote}</div>
  {/if}
</div>
