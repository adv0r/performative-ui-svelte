<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAnchorAttributes & {
    icon?: string;
    iconNode?: Snippet;
    title: string;
    subtitle: string;
  };

  let { icon, iconNode, title, subtitle, class: className = "", ...rest }: Props = $props();
</script>

<a class={cn("pui-community", className)} {...rest}>
  {#if iconNode}
    {@render iconNode()}
  {:else if icon}
    <img class="pui-community__icon" src={icon} alt="" />
  {/if}
  <div>
    <div class="pui-community__top">{title}</div>
    <div class="pui-community__bottom">{subtitle}</div>
  </div>
</a>
