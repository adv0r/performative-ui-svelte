<script lang="ts">
  import { base } from "$app/paths";
  import CodeBlock from "$lib/docs/CodeBlock.svelte";
  import CommandTabs from "$lib/docs/CommandTabs.svelte";
  import { PACKAGE_REPO } from "$lib/docs/catalog.js";

  type ManagerId = "npm" | "pnpm" | "bun" | "yarn";
  const managers = [
    { id: "npm" as const, label: "npm", install: `npm install ${PACKAGE_REPO}` },
    { id: "pnpm" as const, label: "pnpm", install: `pnpm add ${PACKAGE_REPO}` },
    { id: "bun" as const, label: "bun", install: `bun add ${PACKAGE_REPO}` },
    { id: "yarn" as const, label: "yarn", install: `yarn add ${PACKAGE_REPO}` }
  ];
  let manager = $state<ManagerId>("npm");
  const installCode = $derived(managers.find((m) => m.id === manager)?.install ?? managers[0].install);

  const usage = `// src/routes/+layout.svelte
import "performative-ui-svelte/styles.css";

// Any component file
import { Button, GradientText, Sparkle } from "performative-ui-svelte";`;

  const svelteKit = $derived(`# New SvelteKit app
npm create svelte@latest my-app
cd my-app
${installCode}

# Add to src/routes/+layout.svelte:
# import "performative-ui-svelte/styles.css";`);

  const glassCardExample = `<script>
  import { GlassCard, GlassCardTitle, GlassCardBody, Button } from "performative-ui-svelte";
<\/script>

<GlassCard breathing>
  <GlassCardTitle>Reason over everything</GlassCardTitle>
  <GlassCardBody>Multi-step, multi-modal, multi-vendor.</GlassCardBody>
  <Button variant="glow" sparkle>Generate</Button>
</GlassCard>`;
</script>

<svelte:head>
  <title>Getting Started · performative-ui-svelte</title>
</svelte:head>

<article>
  <header class="cp-header">
    <div class="cp-eyebrow"><span>Guide</span></div>
    <h1 class="cp-title">Getting Started</h1>
    <p class="cp-snark">From GitHub install to a gradient-soaked demo in under two minutes.</p>
  </header>

  <section class="cp-section">
    <h2 class="cp-section__title">1. Install the package</h2>
    <p class="cp-description">
      Install directly from GitHub. The package builds on install via the <code>prepare</code> script — keep lifecycle scripts enabled.
    </p>
    <CommandTabs
      tabs={managers.map((m) => ({ id: m.id, label: m.label }))}
      selected={manager}
      onSelect={(id: string) => (manager = id as ManagerId)}
      code={installCode}
    />
  </section>

  <section class="cp-section">
    <h2 class="cp-section__title">2. Import global styles once</h2>
    <p class="cp-description">All components share one stylesheet. Import it in your root layout.</p>
    <CodeBlock code={usage} />
  </section>

  <section class="cp-section">
    <h2 class="cp-section__title">3. Use components</h2>
    <p class="cp-description">Every component is a named export. Compound components use named sub-exports.</p>
    <CodeBlock code={glassCardExample} />
  </section>

  <section class="cp-section">
    <h2 class="cp-section__title">4. SvelteKit scaffold</h2>
    <CodeBlock code={svelteKit} />
  </section>

  <section class="cp-section">
    <h2 class="cp-section__title">Next steps</h2>
    <ul class="guide-links">
      <li><a href="{base}/components/button">Browse component docs</a></li>
      <li><a href="{base}/getting-started/theming">Customize theme tokens</a></li>
      <li><a href="{base}/actions">Use composable actions</a></li>
      <li><a href="{base}/demo">See the full landing demo</a></li>
    </ul>
  </section>
</article>

<style>
  .guide-links {
    margin: 0;
    padding-left: 18px;
    color: var(--pui-fg-dim);
    line-height: 1.8;
  }

  .guide-links a {
    color: var(--pui-fg);
  }
</style>
