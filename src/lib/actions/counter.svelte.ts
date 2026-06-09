import type { CounterOptions } from "../types.js";

export function createCounter({
  target,
  durationMs = 1800,
  from = 0,
  ease = (t) => 1 - Math.pow(1 - t, 3)
}: CounterOptions) {
  let value = $state(from);

  $effect(() => {
    let raf = 0;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      value = Math.floor(from + (target - from) * ease(t));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });

  return {
    get value() {
      return value;
    }
  };
}
