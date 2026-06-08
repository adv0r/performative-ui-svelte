<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { LogoRowItem, LogoTextStyle } from "../types.js";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLDivElement> & {
    heading?: string;
    logos: LogoRowItem[];
  };

  let { heading, logos, class: className = "", ...rest }: Props = $props();

  const textClass = (style?: LogoTextStyle) =>
    cn(
      "pui-logo-row__text",
      style === "serif" && "pui-logo-row__text--serif",
      style === "italic" && "pui-logo-row__text--italic",
      style === "bold" && "pui-logo-row__text--bold"
    );
</script>

<div class={cn("pui-logo-row", className)} {...rest}>
  {#if heading}
    <p class="pui-logo-row__heading">{heading}</p>
  {/if}
  <div class="pui-logo-row__items">
    {#each logos as logo, i (`${logo.kind}-${i}`)}
      {#if logo.kind === "img"}
        <img src={logo.src} alt={logo.alt ?? ""} />
      {:else}
        <span class={textClass(logo.style)}>{logo.text}</span>
      {/if}
    {/each}
  </div>
</div>
