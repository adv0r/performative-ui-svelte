import type { Action } from "svelte/action";
import type { AsciiFieldOptions } from "../types.js";

const DEFAULT_RAMP =
  " .`'\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const DEFAULT_PALETTE = ["#a78bfa", "#ec4899", "#67e8f9", "#fbbf24"];

export const asciiField: Action<HTMLCanvasElement, AsciiFieldOptions | undefined> = (
  canvas,
  options = {}
) => {
  let opts = options;
  let cleanup = mount(canvas, opts);

  return {
    update(next = {}) {
      opts = next;
      cleanup();
      cleanup = mount(canvas, opts);
    },
    destroy() {
      cleanup();
    }
  };
};

function mount(canvas: HTMLCanvasElement, options: AsciiFieldOptions) {
  const host = canvas.parentElement;
  const ctx = canvas.getContext("2d");
  if (!host || !ctx) return () => {};

  const {
    cols: colsOpt,
    rows: rowsOpt,
    fontSize = 11,
    fontFamily = "JetBrains Mono, ui-monospace, monospace",
    charRamp = DEFAULT_RAMP,
    colorful = false,
    palette: paletteOpt,
    baseOpacity = 1,
    reactive = true,
    rippleStrength = 1.4,
    rippleRadius = 6,
    spotlightOpacity,
    spotlightRadius = 8,
    frameMs = 50
  } = options;

  const palette = paletteOpt ?? (colorful ? DEFAULT_PALETTE : null);
  let raf = 0;
  let lastFrame = 0;
  let cols = 0;
  let rows = 0;
  let cellW = 0;
  let cellH = 0;
  let baseField = new Float32Array(0);
  const mouse = { x: -9999, y: -9999 };

  const seed = () => {
    baseField = new Float32Array(cols * rows);
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const nx = (x / cols) * 2 - 1;
        const ny = (y / rows) * 2 - 1;
        const r = Math.sqrt(nx * nx + ny * ny);
        const stripes = 0.5 + 0.5 * Math.sin(nx * 6 + ny * 2);
        const radial = 1 - Math.min(1, r * 1.2);
        baseField[y * cols + x] = 0.25 * stripes + 0.55 * radial;
      }
    }
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = "top";
    const measured = ctx.measureText("M").width || fontSize * 0.6;
    cellW = measured;
    cellH = fontSize * 1.15;
    cols = colsOpt ?? Math.max(1, Math.floor(rect.width / cellW));
    rows = rowsOpt ?? Math.max(1, Math.floor(rect.height / cellH));
    if (colsOpt !== undefined) cellW = rect.width / cols;
    if (rowsOpt !== undefined) cellH = rect.height / rows;
    seed();
  };

  const render = (t: number) => {
    if (t - lastFrame < frameMs) {
      raf = requestAnimationFrame(render);
      return;
    }
    lastFrame = t;
    if (cols === 0 || rows === 0) resize();

    const rect = canvas.getBoundingClientRect();
    const time = t * 0.001;
    const cx = (mouse.x - rect.left) / cellW;
    const cy = (mouse.y - rect.top) / cellH;
    const mouseInside =
      mouse.x >= rect.left - 24 &&
      mouse.x <= rect.right + 24 &&
      mouse.y >= rect.top - 24 &&
      mouse.y <= rect.bottom + 24;

    ctx.clearRect(0, 0, rect.width, rect.height);
    const rampMax = charRamp.length - 1;
    const spotR2 = spotlightRadius * spotlightRadius * 2;
    const useSpotlight =
      typeof spotlightOpacity === "number" && spotlightOpacity !== baseOpacity;

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const base = baseField[y * cols + x];
        const wave =
          0.15 *
          Math.sin(x * 0.18 + time * 1.4) *
          Math.cos(y * 0.22 - time * 1.1);
        const dx = x - cx;
        const dy = (y - cy) * 1.8;
        const d2 = dx * dx + dy * dy;
        const ripple =
          reactive && mouseInside
            ? rippleStrength * Math.exp(-d2 / (rippleRadius * rippleRadius * 2))
            : 0;
        const v = Math.max(0, Math.min(1, base + wave + ripple));
        const ch = charRamp[Math.floor(v * rampMax)] ?? ".";
        const alpha =
          useSpotlight && mouseInside
            ? baseOpacity +
              ((spotlightOpacity ?? baseOpacity) - baseOpacity) *
                Math.exp(-d2 / spotR2)
            : baseOpacity;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = palette
          ? palette[(x + y + Math.floor(time * 2)) % palette.length]
          : "rgba(244,244,246,1)";
        ctx.fillText(ch, x * cellW, y * cellH);
      }
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(render);
  };

  const onMouse = (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };
  const onLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
  };

  const observer = new ResizeObserver(resize);
  observer.observe(host);
  window.addEventListener("mousemove", onMouse);
  window.addEventListener("mouseleave", onLeave);
  resize();
  raf = requestAnimationFrame(render);

  return () => {
    observer.disconnect();
    window.removeEventListener("mousemove", onMouse);
    window.removeEventListener("mouseleave", onLeave);
    cancelAnimationFrame(raf);
  };
}
