<script lang="ts">
  import Example from "$lib/docs/Example.svelte";
  import LogoMarquee from "$lib/components/LogoMarquee.svelte";

  const ic = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${slug}.svg`;
</script>

<Example
  title="Real + text logos"
  stretch
  code={`<LogoMarquee
  logos={[
    { kind: "img", src: openaiSvgUrl, alt: "OpenAI" },
    { kind: "img", src: stripeSvgUrl, alt: "Stripe" },
    { kind: "text", text: "NASA", style: "bold" },
    { kind: "text", text: "Harvard", style: "serif" }
  ]}
  speed={30}
/>`}
>
  <LogoMarquee
    logos={[
      { kind: "img", src: ic("openai"), alt: "OpenAI" },
      { kind: "img", src: ic("stripe"), alt: "Stripe" },
      { kind: "img", src: ic("anthropic"), alt: "Anthropic" },
      { kind: "text", text: "NASA", style: "bold" },
      { kind: "img", src: ic("notion"), alt: "Notion" },
      { kind: "img", src: ic("shopify"), alt: "Shopify" },
      { kind: "text", text: "Harvard", style: "serif" },
      { kind: "img", src: ic("vercel"), alt: "Vercel" },
      { kind: "img", src: ic("github"), alt: "GitHub" },
      { kind: "img", src: ic("nvidia"), alt: "NVIDIA" }
    ]}
    speed={30}
  />
</Example>
