<script lang="ts">
  import { onDestroy } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLSpanElement> & {
    words: string[];
    intervalMs?: number;
    transitionMs?: number;
    direction?: "up" | "down";
    gradient?: boolean;
  };

  let {
    words,
    intervalMs = 2200,
    transitionMs = 500,
    direction = "up",
    gradient = false,
    class: className = "",
    style = "",
    ...rest
  }: Props = $props();

  let active = $state(0);
  let timer: ReturnType<typeof setInterval> | undefined;

  $effect(() => {
    if (!words.length) return;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      active = (active + 1) % words.length;
    }, intervalMs);
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });

  let previous = $derived((active - 1 + words.length) % words.length);
  let mergedStyle = $derived(`${style};--pui-roll-ms:${transitionMs}ms`);
</script>

<span
  class={cn("pui-roll", direction === "down" && "pui-roll--down", gradient && "pui-roll--gradient", className)}
  style={mergedStyle}
  {...rest}
>
  <span class="pui-roll__sizer" aria-hidden="true">{words[active] ?? ""}</span>
  {#each words as word, i (word + i)}
    <span
      class={cn(
        "pui-roll__word",
        i === active && "pui-roll__word--active",
        i === previous && active !== previous && "pui-roll__word--past"
      )}
      aria-hidden={i === active ? undefined : "true"}
    >
      {word}
    </span>
  {/each}
</span>
