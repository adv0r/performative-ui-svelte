<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Blob = { color: string; x: number; y: number; size?: number };
  type Props = HTMLAttributes<HTMLDivElement> & {
    blobs?: Blob[];
    blur?: number;
    static?: boolean;
    animated?: boolean;
    repulsion?: number;
  };

  const DEFAULT_BLOBS: Blob[] = [
    { color: "rgba(124,58,237,0.45)", x: 20, y: 30, size: 60 },
    { color: "rgba(236,72,153,0.35)", x: 80, y: 25, size: 50 },
    { color: "rgba(6,182,212,0.30)", x: 50, y: 80, size: 50 }
  ];

  let {
    blobs = DEFAULT_BLOBS,
    blur = 50,
    static: isStatic = false,
    animated = false,
    repulsion = 0.18,
    class: className = "",
    style = "",
    ...rest
  }: Props = $props();

  type SimBlob = Required<Pick<Blob, "x" | "y">> & {
    color: string;
    size: number;
    homeX: number;
    homeY: number;
    vx: number;
    vy: number;
  };

  let sim = $state<SimBlob[]>([]);
  let raf = 0;

  let backgroundImage = $derived(
    blobs
      .map((b) => `radial-gradient(circle at ${b.x}% ${b.y}%, ${b.color} 0%, transparent ${b.size ?? 50}%)`)
      .join(",")
  );
  let mergedStyle = $derived(`${style};filter:blur(${blur}px) saturate(140%);background-image:${backgroundImage}`);

  onMount(() => {
    if (!animated) return;
    sim = blobs.map((b) => ({
      x: b.x,
      y: b.y,
      homeX: b.x,
      homeY: b.y,
      size: b.size ?? 50,
      color: b.color,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06
    }));

    const tick = () => {
      sim = sim.map((blob, i) => {
        let vx = blob.vx * 0.965 + (blob.homeX - blob.x) * 0.0009 + (Math.random() - 0.5) * 0.012;
        let vy = blob.vy * 0.965 + (blob.homeY - blob.y) * 0.0009 + (Math.random() - 0.5) * 0.012;

        for (let j = 0; j < sim.length; j += 1) {
          if (i === j) continue;
          const other = sim[j];
          if (!other) continue;
          const dx = blob.x - other.x;
          const dy = blob.y - other.y;
          const d = Math.hypot(dx, dy);
          const minDist = (blob.size + other.size) * 0.4;
          if (d < minDist && d > 0.001) {
            const force = ((minDist - d) / minDist) * repulsion;
            vx += (dx / d) * force;
            vy += (dy / d) * force;
          }
        }

        let x = blob.x + vx;
        let y = blob.y + vy;
        if (x < -10) {
          x = -10;
          vx = Math.abs(vx) * 0.6;
        }
        if (x > 110) {
          x = 110;
          vx = -Math.abs(vx) * 0.6;
        }
        if (y < -10) {
          y = -10;
          vy = Math.abs(vy) * 0.6;
        }
        if (y > 110) {
          y = 110;
          vy = -Math.abs(vy) * 0.6;
        }
        return { ...blob, x, y, vx, vy };
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });
</script>

<div
  class={cn("pui-aurora", !isStatic && !animated && "pui-aurora--drift", className)}
  style={animated ? `${style};filter:blur(${blur}px) saturate(140%)` : mergedStyle}
  {...rest}
>
  {#if animated}
    {#each sim as blob, i (i)}
      <div
        style={`position:absolute;left:${blob.x - blob.size / 2}%;top:${blob.y - blob.size / 2}%;width:${blob.size}%;height:${blob.size}%;border-radius:999px;background:${blob.color}`}
      ></div>
    {/each}
  {/if}
</div>
