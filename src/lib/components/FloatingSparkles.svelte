<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLDivElement> & {
    count?: number;
    glyphs?: string[];
    durationS?: [number, number];
    sizeRange?: [number, number];
  };

  let {
    count = 18,
    glyphs = ["✦", "✧", "✶", "✺", "✹", "·"],
    durationS = [8, 18],
    sizeRange = [8, 20],
    class: className = "",
    ...rest
  }: Props = $props();

  type Item = {
    glyph: string;
    left: number;
    duration: number;
    delay: number;
    size: number;
    opacity: number;
  };

  let items = $state<Item[]>([]);

  $effect(() => {
    items = Array.from({ length: count }, () => ({
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)] ?? "✦",
      left: Math.random() * 100,
      duration: durationS[0] + Math.random() * (durationS[1] - durationS[0]),
      delay: Math.random() * durationS[1],
      size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
      opacity: 0.4 + Math.random() * 0.5
    }));
  });
</script>

<div aria-hidden="true" class={cn("pui-sparkle-field", className)} {...rest}>
  {#each items as it, i (i)}
    <span
      class="pui-sparkle-field__item"
      style={`left:${it.left}%;font-size:${it.size}px;--pui-sparkle-peak:${it.opacity.toFixed(2)};animation-duration:${it.duration}s;animation-delay:${it.delay}s`}
    >
      {it.glyph}
    </span>
  {/each}
</div>
