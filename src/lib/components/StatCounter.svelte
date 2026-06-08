<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { CounterOptions } from "../types.js";
  import { createCounter } from "../actions/counter.svelte.js";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLSpanElement> &
    CounterOptions & {
      format?: (value: number) => string;
    };

  let {
    target,
    durationMs,
    from,
    ease,
    format = (n) => n.toLocaleString(),
    class: className = "",
    ...rest
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  const counter = createCounter({ target, durationMs, from, ease });
</script>

<span class={cn("pui-stat", className)} {...rest}>{format(counter.value)}</span>
