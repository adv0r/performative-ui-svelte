<script lang="ts">
  import Example from "$lib/docs/Example.svelte";
  import LogoRow from "$lib/components/LogoRow.svelte";

  const ic = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${slug}.svg`;
</script>

<Example
  title="Backed by"
  code={`<LogoRow
  heading="Backed by"
  logos={[
    { kind: "img", src: ycSvgUrl, alt: "YC" },
    { kind: "text", text: "a16z", style: "bold" },
    { kind: "text", text: "Sequoia", style: "serif" }
  ]}
/>`}
>
  <LogoRow
    heading="Backed by"
    logos={[
      { kind: "img", src: ic("ycombinator"), alt: "YC" },
      { kind: "text", text: "a16z", style: "bold" },
      { kind: "text", text: "Sequoia", style: "serif" },
      { kind: "text", text: "FOUNDERS FUND", style: "bold" },
      { kind: "text", text: "…and 47 angels you've heard of", style: "italic" }
    ]}
  />
</Example>
