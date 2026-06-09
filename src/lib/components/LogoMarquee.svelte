<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { LogoTextStyle, MarqueeItem } from "../types.js";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLDivElement> & {
    logos: MarqueeItem[];
    speed?: number;
    gap?: number;
    fade?: boolean;
    pauseOnHover?: boolean;
  };

  let {
    logos,
    speed = 40,
    gap = 56,
    fade = true,
    pauseOnHover = false,
    class: className = "",
    style = "",
    ...rest
  }: Props = $props();

  let mergedStyle = $derived(`${style};--pui-marquee-speed:${speed}s;--pui-marquee-gap:${gap}px`);
  let doubled = $derived([...logos, ...logos]);

  const textClass = (style?: LogoTextStyle) =>
    cn(
      "pui-marquee__text",
      style === "serif" && "pui-marquee__text--serif",
      style === "italic" && "pui-marquee__text--italic",
      style === "bold" && "pui-logo-row__text--bold"
    );
</script>

<div
  class={cn("pui-marquee", fade && "pui-marquee--fade", pauseOnHover && "pui-marquee--paused-on-hover", className)}
  style={mergedStyle}
  aria-label="Trusted by"
  {...rest}
>
  <div class="pui-marquee__track">
    {#each doubled as logo, i (`${logo.kind}-${i}`)}
      <span class="pui-marquee__item">
        {#if logo.kind === "img"}
          <img src={logo.src} alt={logo.alt ?? ""} />
        {:else}
          <span class={textClass(logo.style)}>{logo.text}</span>
        {/if}
      </span>
    {/each}
  </div>
</div>
