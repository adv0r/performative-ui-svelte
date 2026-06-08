<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { TokenStreamOptions } from "../types.js";
  import { createTokenStream } from "../actions/token-stream.svelte.js";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLSpanElement> &
    TokenStreamOptions & {
      hideCaret?: boolean;
    };

  let {
    text,
    speedMs,
    tokenize,
    loop,
    loopDelayMs,
    onComplete,
    hideCaret = false,
    class: className = "",
    ...rest
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  const stream = createTokenStream({ text, speedMs, tokenize, loop, loopDelayMs, onComplete });
</script>

<span class={cn(className)} {...rest}>
  {stream.output}
  {#if !hideCaret && stream.isStreaming}
    <span class="pui-bubble__stream-caret"></span>
  {/if}
</span>
