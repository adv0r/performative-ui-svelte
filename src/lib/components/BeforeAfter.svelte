<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";
  import BeforeAfterBefore from "./BeforeAfterBefore.svelte";
  import BeforeAfterAfter from "./BeforeAfterAfter.svelte";
  import BeforeAfterArrow from "./BeforeAfterArrow.svelte";

  type Props = HTMLAttributes<HTMLDivElement> & {
    before?: string[];
    after?: string[];
    brand?: string;
    beforeLabel?: string;
    afterLabel?: string;
    children?: Snippet;
  };

  let {
    before = [],
    after = [],
    brand,
    beforeLabel = "Before",
    afterLabel = "After",
    class: className = "",
    children,
    ...rest
  }: Props = $props();
</script>

<div class={cn("pui-ba", className)} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <BeforeAfterBefore label={beforeLabel}>
      <ul>
        {#each before as item}
          <li>{item}</li>
        {/each}
      </ul>
    </BeforeAfterBefore>
    <BeforeAfterArrow {brand} />
    <BeforeAfterAfter label={afterLabel}>
      <ul>
        {#each after as item}
          <li>{item}</li>
        {/each}
      </ul>
    </BeforeAfterAfter>
  {/if}
</div>
