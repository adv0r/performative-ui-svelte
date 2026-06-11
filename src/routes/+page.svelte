<script lang="ts">
  import { base } from "$app/paths";
  import { Button, EyebrowPill, GradientText, Sparkle, WordRoll } from "$lib";
  import { COMPONENTS, CATEGORIES, DOCS_BASE_URL, PACKAGE_REPO } from "$lib/docs/catalog.js";
  import CodeBlock from "$lib/docs/CodeBlock.svelte";
  import CommandTabs from "$lib/docs/CommandTabs.svelte";

  type ManagerId = "npm" | "pnpm" | "bun" | "yarn";
  const managers = [
    { id: "npm" as const, label: "npm", install: `npm install ${PACKAGE_REPO}` },
    { id: "pnpm" as const, label: "pnpm", install: `pnpm add ${PACKAGE_REPO}` },
    { id: "bun" as const, label: "bun", install: `bun add ${PACKAGE_REPO}` },
    { id: "yarn" as const, label: "yarn", install: `yarn add ${PACKAGE_REPO}` }
  ];
  let manager = $state<ManagerId>("npm");
  const installCode = $derived(managers.find((m) => m.id === manager)?.install ?? managers[0].install);
</script>

<svelte:head>
  <title>performative-ui-svelte · AI-native Svelte Components</title>
  <meta
    name="description"
    content="Drop-in Svelte 5 port of performative-ui. 28 components, one CSS import, zero Tailwind required."
  />
</svelte:head>

<article class="home">
  <header class="home__hero">
    <EyebrowPill>28 components · MIT · zero runtime deps</EyebrowPill>
    <h1>
      AI-native Svelte components for
      <GradientText><WordRoll words={["startups", "demos", "landing pages", "agent apps"]} gradient /></GradientText>
    </h1>
    <p>
      A faithful port of <a href="https://github.com/vorpus/performativeUI">performative-ui</a> with per-component docs,
      live examples, props tables, and a package install that works without Tailwind.
    </p>
    <div class="home__actions">
      <Button as="a" href="{base}/getting-started" variant="glow" sparkle>Get started</Button>
      <Button as="a" href="{base}/components/sparkle" variant="ghost">Browse components</Button>
      <Button as="a" href="{base}/demo" variant="ghost">Live demo</Button>
    </div>
  </header>

  <section class="home__section">
    <h2>Install in one command</h2>
    <p>No npm publish yet — install directly from GitHub, import one CSS file, ship.</p>
    <CommandTabs
      tabs={managers.map((m) => ({ id: m.id, label: m.label }))}
      selected={manager}
      onSelect={(id) => (manager = id as ManagerId)}
      code={`${installCode}

# In your root layout:
import "performative-ui-svelte/styles.css";`}
    />
    <CodeBlock
      code={`import { Button, GradientText, Sparkle } from "performative-ui-svelte";

<h1>Ship <GradientText>agentic workflows</GradientText> <Sparkle /></h1>
<Button variant="glow" sparkle>Generate</Button>`}
    />
  </section>

  <section class="home__section">
    <h2>Why this port</h2>
    <div class="home__grid">
      <div class="home__card">
        <h3>Drop-in package</h3>
        <p>One CSS import. No Tailwind config, no registry scaffolding, no `@source` scanning.</p>
      </div>
      <div class="home__card">
        <h3>Upstream fidelity</h3>
        <p>Same `.pui-*` styling model as the React original — not a utility-class rewrite.</p>
      </div>
      <div class="home__card">
        <h3>Actions included</h3>
        <p>Reusable <a href="{base}/actions">typewriter, counter, token stream, and ascii field</a> helpers.</p>
      </div>
      <div class="home__card">
        <h3>LLM-friendly</h3>
        <p>Machine-readable catalog at <a href="{base}/llms.txt">{DOCS_BASE_URL}/llms.txt</a>.</p>
      </div>
    </div>
  </section>

  <section class="home__section">
    <h2>Component catalog</h2>
    {#each CATEGORIES as category}
      <div class="home__category">
        <h3>{category}</h3>
        <div class="home__catalog">
          {#each COMPONENTS.filter((c) => c.category === category) as component (component.slug)}
            <a class="home__catalog-card" href="{base}/components/{component.slug}">
              <strong>{component.name}</strong>
              <span>{component.snark}</span>
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </section>
</article>

<style>
  .home {
    max-width: 920px;
    margin: 0 auto;
    padding: 48px 24px 96px;
  }

  .home__hero {
    display: grid;
    gap: 18px;
    margin-bottom: 56px;
  }

  h1 {
    margin: 0;
    font-size: clamp(36px, 5vw, 64px);
    line-height: 0.98;
  }

  h2 {
    margin: 0 0 12px;
    font-size: 28px;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 18px;
  }

  .home__hero > p,
  .home__section > p {
    margin: 0;
    color: var(--pui-fg-dim);
    line-height: 1.65;
    font-size: 17px;
  }

  .home__hero a,
  .home__card a {
    color: var(--pui-fg);
  }

  .home__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .home__section {
    display: grid;
    gap: 16px;
    margin-bottom: 56px;
  }

  .home__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
  }

  .home__card,
  .home__catalog-card {
    border: 1px solid var(--pui-border);
    border-radius: var(--pui-radius);
    background: var(--pui-glass-soft);
    box-shadow: var(--pui-shadow-card);
  }

  .home__card {
    padding: 18px;
  }

  .home__card p {
    margin: 0;
    color: var(--pui-fg-dim);
    line-height: 1.55;
    font-size: 14px;
  }

  .home__category {
    margin-top: 24px;
  }

  .home__catalog {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }

  .home__catalog-card {
    display: grid;
    gap: 8px;
    padding: 16px;
    color: inherit;
    text-decoration: none;
    transition: border-color 0.15s ease, transform 0.15s ease;
  }

  .home__catalog-card:hover {
    border-color: var(--pui-border-bright);
    transform: translateY(-1px);
  }

  .home__catalog-card span {
    color: var(--pui-fg-dim);
    font-size: 13px;
    line-height: 1.45;
  }
</style>
