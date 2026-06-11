<script lang="ts">
  import { base } from "$app/paths";
  import CodeBlock from "$lib/docs/CodeBlock.svelte";
</script>

<svelte:head>
  <title>Actions · performative-ui-svelte</title>
</svelte:head>

<article>
  <header class="cp-header">
    <div class="cp-eyebrow"><span>Guide</span></div>
    <h1 class="cp-title">Actions & utilities</h1>
    <p class="cp-snark">Composable helpers the React original hides inside components — exported for your own UI.</p>
  </header>

  <section class="cp-section">
    <h2 class="cp-section__title">createTypewriter</h2>
    <p class="cp-description">Powers <a href="{base}/components/rotator">Rotator</a>. Cycle words with type/delete timing.</p>
    <CodeBlock
      code={`import { createTypewriter } from "performative-ui-svelte";

const tw = createTypewriter({
  words: ["agents", "workflows", "demos"],
  typeMs: 70,
  deleteMs: 40,
  holdMs: 1200
});

// tw.word — current word
// tw.cursor — blinking caret state`}
    />
  </section>

  <section class="cp-section">
    <h2 class="cp-section__title">createCounter</h2>
    <p class="cp-description">Powers <a href="{base}/components/stat-counter">StatCounter</a>. Animated number easing.</p>
    <CodeBlock
      code={`import { createCounter } from "performative-ui-svelte";

const counter = createCounter({ target: 51842, durationMs: 1400 });
// counter.value — reactive current value`}
    />
  </section>

  <section class="cp-section">
    <h2 class="cp-section__title">createTokenStream</h2>
    <p class="cp-description">Powers <a href="{base}/components/token-stream">TokenStream</a>. Tokenized streaming text.</p>
    <CodeBlock
      code={`import { createTokenStream } from "performative-ui-svelte";

const stream = createTokenStream({
  text: "Thinking… then shipping.",
  speedMs: [24, 80],
  loop: true
});`}
    />
  </section>

  <section class="cp-section">
    <h2 class="cp-section__title">asciiField</h2>
    <p class="cp-description">Powers <a href="{base}/components/ascii-hero">AsciiHero</a>. Canvas ASCII background action.</p>
    <CodeBlock
      code={`import { asciiField } from "performative-ui-svelte";

<canvas use:asciiField={{ cols: 80, rows: 24, reactive: true }}></canvas>`}
    />
  </section>

  <section class="cp-section">
    <h2 class="cp-section__title">cn</h2>
    <p class="cp-description">Tiny class-name helper used internally — exported if you extend components.</p>
    <CodeBlock code={`import { cn } from "performative-ui-svelte";`} />
  </section>
</article>

<style>
  .cp-description a {
    color: var(--pui-fg);
  }
</style>
