<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { SlippyWord } from "../types.js";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Rows of badges. Each row slides horizontally as the component
     * scrolls through the viewport; consecutive rows travel in opposite
     * directions. Provide more badges than fit so the sliding never
     * exposes an empty edge.
     */
    rows: SlippyWord[][];
    /** Max horizontal travel, in px, from one viewport edge to the other. */
    intensity?: number;
    /** Direction the first row drifts as you scroll down. Rows alternate. */
    startDirection?: "left" | "right";
    /** Gap between badges in px. */
    gap?: number;
    /** Apply an edge-fade mask so badges dissolve at the sides. */
    fade?: boolean;
    /** Render every badge with the mandatory gradient fill. */
    gradient?: boolean;
    /** Disable the scroll coupling (also forced under prefers-reduced-motion). */
    static?: boolean;
  };

  let {
    rows,
    intensity = 240,
    startDirection = "left",
    gap = 12,
    fade = true,
    gradient = false,
    static: isStatic,
    class: className = "",
    style = "",
    ...rest
  }: Props = $props();

  let host = $state<HTMLDivElement | null>(null);

  let mergedStyle = $derived(`${style};--pui-slip-gap:${gap}px`);
  let firstDir = $derived(startDirection === "left" ? -1 : 1);

  function normalize(word: SlippyWord): { label: string | Snippet; gradient?: boolean } {
    return typeof word === "string" ? { label: word } : word;
  }

  function wordKey(word: SlippyWord, ri: number, wi: number) {
    return (typeof word === "object" && word.key) || `${ri}-${wi}`;
  }

  $effect(() => {
    if (!host || isStatic) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const el = host;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const p = (vh - rect.top) / (vh + rect.height);
      const offset = (Math.min(1, Math.max(0, p)) - 0.5) * intensity;
      el.style.setProperty("--pui-slip", `${offset}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  });
</script>

<div
  bind:this={host}
  class={cn("pui-slippy", fade && "pui-slippy--fade", className)}
  style={mergedStyle}
  aria-label="Featured terms"
  {...rest}
>
  {#each rows as row, ri (ri)}
    <div
      class="pui-slippy__row"
      style={`--pui-slip-dir:${ri % 2 === 0 ? firstDir : -firstDir}`}
    >
      {#each row as word, wi (wordKey(word, ri, wi))}
        {@const w = normalize(word)}
        <span
          class={cn(
            "pui-slippy__word",
            (gradient || (typeof word === "object" && word.gradient)) && "pui-slippy__word--gradient"
          )}
        >
          {#if typeof w.label === "string"}
            {w.label}
          {:else}
            {@render w.label()}
          {/if}
        </span>
      {/each}
    </div>
  {/each}
</div>
