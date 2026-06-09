<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { TypewriterOptions } from "../types.js";
  import { createTypewriter } from "../actions/typewriter.svelte.js";
  import { cn } from "../utils/cn.js";

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "prefix"> &
    TypewriterOptions & {
      hideCursor?: boolean;
      cursor?: string;
      renderWord?: Snippet<[string, number]>;
    };

  let {
    words,
    typeMs,
    deleteMs,
    holdMs,
    loop,
    onWordReached,
    hideCursor = false,
    cursor,
    renderWord,
    class: className = "",
    ...rest
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  const rotator = createTypewriter({ words, typeMs, deleteMs, holdMs, loop, onWordReached });
</script>

<span class={cn("pui-rotator", className)} {...rest}>
  {#if renderWord}
    {@render renderWord(rotator.word, rotator.index)}
  {:else}
    {rotator.word}
  {/if}
  {#if !hideCursor}
    <span
      aria-hidden="true"
      class={cn(
        "pui-rotator__cursor",
        cursor === undefined && "pui-rotator__cursor--block",
        "pui-rotator__cursor--blink"
      )}
    >
      {cursor}
    </span>
  {/if}
</span>
