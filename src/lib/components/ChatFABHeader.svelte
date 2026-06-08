<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";
  import Sparkle from "./Sparkle.svelte";
  import { getChatFABClose } from "./chat-fab-context.js";

  type Props = HTMLAttributes<HTMLDivElement> & {
    onClose?: () => void;
    children?: Snippet;
  };

  let { onClose, class: className = "", children, ...rest }: Props = $props();
  const close = getChatFABClose();
</script>

<div class={cn("pui-fab-popover__header", className)} {...rest}>
  <Sparkle />
  <span>{@render children?.()}</span>
  <button type="button" aria-label="Close" class="pui-fab-popover__close" onclick={onClose ?? close}>
    x
  </button>
</div>
