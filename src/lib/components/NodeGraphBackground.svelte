<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLDivElement> & {
    density?: number;
    speed?: number;
    linkDistance?: number;
    colors?: string[];
    linkColor?: string;
    hoverDistance?: number;
    hoverGravity?: number;
    hoverBrighten?: number;
    baseOpacity?: number;
    overscan?: number;
  };

  let {
    density = 70,
    speed = 0.4,
    linkDistance = 140,
    colors = ["#a78bfa", "#f0abfc", "#67e8f9"],
    linkColor = "#7c3aed",
    hoverDistance = 200,
    hoverGravity = 0.005,
    hoverBrighten = 0.8,
    baseOpacity = 0.45,
    overscan = 80,
    class: className = "",
    ...rest
  }: Props = $props();

  let host: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let raf = 0;

  type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string };

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const seed = () => {
      const wMin = -overscan;
      const wMax = width + overscan;
      const hMin = -overscan;
      const hMax = height + overscan;
      nodes = Array.from({ length: density }, () => ({
        x: wMin + Math.random() * (wMax - wMin),
        y: hMin + Math.random() * (hMax - hMin),
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        r: 1 + Math.random() * 1.6,
        color: colors[Math.floor(Math.random() * colors.length)] ?? "#a78bfa"
      }));
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const alphaFor = (x: number, y: number) => {
      if (hoverDistance <= 0 || hoverBrighten <= 0) return baseOpacity;
      const dist = Math.hypot(mouse.x - x, mouse.y - y);
      const boost = Math.max(0, 1 - dist / hoverDistance) * hoverBrighten;
      return Math.min(1, baseOpacity + boost);
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const wMin = -overscan;
      const wMax = width + overscan;
      const hMin = -overscan;
      const hMax = height + overscan;

      for (const node of nodes) {
        if (hoverDistance > 0 && hoverGravity > 0) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const d = Math.hypot(dx, dy);
          if (d < hoverDistance && d > 0.001) {
            const force = (1 - d / hoverDistance) * hoverGravity;
            node.vx += dx * force;
            node.vy += dy * force;
          }
        }

        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.995;
        node.vy *= 0.995;

        if (node.x < wMin || node.x > wMax) node.vx *= -1;
        if (node.y < hMin || node.y > hMax) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          if (!b) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDistance) {
            const near = Math.max(alphaFor(a.x, a.y), alphaFor(b.x, b.y));
            ctx.globalAlpha = (1 - d / linkDistance) * near;
            ctx.strokeStyle = linkColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.globalAlpha = alphaFor(node.x, node.y);
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);
    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  });
</script>

<div bind:this={host} class={cn("pui-node-graph", className)} {...rest}>
  <canvas bind:this={canvas} style="display:block;width:100%;height:100%"></canvas>
</div>
