<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";
  import Sparkle from "./Sparkle.svelte";
  import Button from "./Button.svelte";

  type Props = Omit<HTMLFormAttributes, "onchange" | "onsubmit"> & {
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    leading?: Snippet | false;
    ctaLabel?: string;
    hideCta?: boolean;
  };

  let {
    placeholder = "Describe what you want to build...",
    defaultValue = "",
    value,
    onChange,
    onSubmit,
    leading,
    ctaLabel = "Generate",
    hideCta = false,
    class: className = "",
    ...rest
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let internal = $state(defaultValue);
  let current = $derived(value !== undefined ? value : internal);

  function setValue(next: string) {
    if (value === undefined) internal = next;
    onChange?.(next);
  }

  function submit(e: SubmitEvent) {
    e.preventDefault();
    onSubmit?.(current);
  }
</script>

<form class={cn("pui-prompt", className)} onsubmit={submit} {...rest}>
  {#if leading !== false}
    <span class="pui-prompt__icon">
      {#if leading}
        {@render leading()}
      {:else}
        <Sparkle />
      {/if}
    </span>
  {/if}
  <input
    class="pui-prompt__input"
    type="text"
    {placeholder}
    value={current}
    oninput={(e) => setValue(e.currentTarget.value)}
    autocomplete="off"
  />
  {#if !hideCta}
    <Button type="submit" variant="glow" sparkle>{ctaLabel}</Button>
  {/if}
</form>
