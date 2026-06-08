<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { IdeToken } from "../types.js";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLPreElement> & {
    tokens: IdeToken[];
    loop?: boolean;
    charMs?: [number, number];
  };

  let { tokens, loop = true, charMs = [14, 42], class: className = "", ...rest }: Props = $props();
  let pre: HTMLPreElement;

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  onMount(() => {
    if (!tokens.length) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const caret = '<span class="pui-caret"></span>';

    const run = () => {
      let tokenIdx = 0;
      let charIdx = 0;
      let html = "";

      const tick = () => {
        if (cancelled) return;
        if (tokenIdx >= tokens.length) {
          pre.innerHTML = html + caret;
          if (loop) {
            timer = setTimeout(() => {
              if (!cancelled) run();
            }, 1800);
          }
          return;
        }

        const token = tokens[tokenIdx];
        if (!token) return;
        const ch = token.c[charIdx] ?? "";
        html += token.cls ? `<span class="pui-tok-${token.cls}">${escape(ch)}</span>` : escape(ch);
        pre.innerHTML = html + caret;

        charIdx += 1;
        if (charIdx >= token.c.length) {
          tokenIdx += 1;
          charIdx = 0;
        }

        const [min, max] = charMs;
        timer = setTimeout(tick, min + Math.random() * (max - min));
      };

      tick();
    };

    run();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  });
</script>

<pre bind:this={pre} class={cn("pui-ide__body", className)} {...rest}></pre>
