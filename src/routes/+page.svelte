<script lang="ts">
  import {
    AsciiHero,
    Aurora,
    BeforeAfter,
    Button,
    ChatBubble,
    ChatFAB,
    ChatFABBody,
    ChatFABHeader,
    CommunityBadge,
    EyebrowPill,
    FloatingSparkles,
    GlassCard,
    GlassCardBody,
    GlassCardIcon,
    GlassCardLink,
    GlassCardTitle,
    GradientText,
    LogoMarquee,
    LogoRow,
    MockIDE,
    NodeGraphBackground,
    Popover,
    PricingCard,
    PricingCardAmount,
    PricingCardBlurb,
    PricingCardCTA,
    PricingCardFeatures,
    PricingCardFlag,
    PricingCardTier,
    Prompt,
    PromptHero,
    Rotator,
    Sparkle,
    StatCounter,
    StatusDot,
    StickyBanner,
    TokenStream,
    WaitlistForm,
    WordRoll
  } from "$lib";
  import type { IdeToken, MarqueeItem } from "$lib";

  type CatalogItem = {
    category: string;
    name: string;
    snark: string;
    props: string;
  };

  const components: CatalogItem[] = [
    { category: "Atoms", name: "Sparkle", snark: "Add sparkle to any noun to ship it twice as fast.", props: "glyph, solid, static" },
    { category: "Atoms", name: "GradientText", snark: "When italic is not billion-dollar enough.", props: "as, static, children" },
    { category: "Atoms", name: "StatusDot", snark: "Always green, even when it is not.", props: "color, static" },
    { category: "Primitives", name: "Button", snark: "We made the button move so you would click the button.", props: "variant, size, sparkle, loading, block, as" },
    { category: "Primitives", name: "EyebrowPill", snark: "Where the model name goes when there is nothing else to say.", props: "icon, statusColor" },
    { category: "Primitives", name: "Prompt", snark: "The textarea every AI builder ships instead of explaining the product.", props: "value, models, model, onSubmit, toolbar controls" },
    { category: "Banners", name: "StickyBanner", snark: "Funding news disguised as utility.", props: "hideSparkle, trailing" },
    { category: "Heroes", name: "Rotator", snark: "Because saying everything was not ambitious enough.", props: "words, typeMs, deleteMs, holdMs, loop" },
    { category: "Heroes", name: "WordRoll", snark: "Breadth-flexing without making the visitor wait for typing.", props: "words, intervalMs, transitionMs, direction, gradient" },
    { category: "Heroes", name: "PromptHero", snark: "We replaced the value prop with a text input.", props: "value, onChange, onSubmit, ctaLabel, hideCta" },
    { category: "Heroes", name: "AsciiHero", snark: "For hackers, by people who follow the right newsletters.", props: "variant plus asciiField options" },
    { category: "Backgrounds", name: "Aurora", snark: "Three blobs and a generation defined.", props: "blobs, blur, static, animated, repulsion" },
    { category: "Backgrounds", name: "NodeGraphBackground", snark: "A neural network, conceptually.", props: "density, speed, linkDistance, hover controls" },
    { category: "Backgrounds", name: "FloatingSparkles", snark: "Magic does not ship itself.", props: "count, glyphs, durationS, sizeRange" },
    { category: "Surfaces", name: "GlassCard", snark: "Backdrop-filter: ambition.", props: "breathing, glowOnHover plus named subcomponents" },
    { category: "Surfaces", name: "MockIDE", snark: "Real code is coming. This is the trailer.", props: "filename, tokens, loop, charMs, thinkingLabel" },
    { category: "Conversation", name: "ChatBubble", snark: "If it is in a bubble, it must be true.", props: "role, agent, thinking, icon" },
    { category: "Conversation", name: "TokenStream", snark: "See it think, slower on purpose.", props: "text, speedMs, tokenize, loop, hideCaret" },
    { category: "Conversation", name: "ChatFAB", snark: "There is no escape now.", props: "label, open, defaultOpen, onOpenChange, popover" },
    { category: "Social Proof", name: "LogoMarquee", snark: "Trusted by everyone you have heard of.", props: "logos, speed, gap, fade, pauseOnHover" },
    { category: "Social Proof", name: "LogoRow", snark: "Static logos are for when you only have six.", props: "heading, logos" },
    { category: "Social Proof", name: "StatCounter", snark: "Numbers that go up are better than numbers that do not.", props: "target, durationMs, from, format" },
    { category: "Social Proof", name: "CommunityBadge", snark: "Stars are the new MAU.", props: "icon, iconNode, title, subtitle" },
    { category: "Pricing and Conversion", name: "PricingCard", snark: "The middle one is glowing. Choose accordingly.", props: "featured plus named subcomponents" },
    { category: "Pricing and Conversion", name: "BeforeAfter", snark: "On the left: chaos. On the right: us.", props: "before, after, brand, labels" },
    { category: "Pricing and Conversion", name: "WaitlistForm", snark: "Demand we manufactured ourselves.", props: "placeholder, ctaLabel, footnote, onSubmit" },
    { category: "Pricing and Conversion", name: "Popover", snark: "The modal that specifically does not close by default.", props: "open, timer, title, closeLabel, close controls" }
  ];

  const categories = [...new Set(components.map((c) => c.category))];

  const logos: MarqueeItem[] = [
    { kind: "text", text: "OpenAI", style: "bold" },
    { kind: "text", text: "YC", style: "serif" },
    { kind: "text", text: "Vercel", style: "bold" },
    { kind: "text", text: "Anthropic", style: "serif" },
    { kind: "text", text: "Linear", style: "bold" },
    { kind: "text", text: "NASA", style: "bold" }
  ];

  const codeTokens: IdeToken[] = [
    { c: "// generated by synthetica\n", cls: "com" },
    { c: "export async function ", cls: "key" },
    { c: "POST", cls: "fn" },
    { c: "(req: Request) {\n" },
    { c: "  const ", cls: "key" },
    { c: "{ prompt } " },
    { c: "= ", cls: "key" },
    { c: "await req.", cls: "" },
    { c: "json", cls: "fn" },
    { c: "();\n" },
    { c: "  return ", cls: "key" },
    { c: "stream", cls: "fn" },
    { c: "({ model: " },
    { c: '"frontier"', cls: "str" },
    { c: ", prompt });\n" },
    { c: "}\n" }
  ];

  let theme = $state<"dark" | "light">("dark");
  let promptResult = $state("No prompt submitted yet.");
  let waitlistResult = $state("Waiting for demand.");
  let popoverOpen = $state(false);

  function setTheme(next: "dark" | "light") {
    theme = next;
  }
</script>

<svelte:head>
  <title>performative-ui-svelte | AI-native Svelte Components</title>
  <meta
    name="description"
    content="A Svelte port of performative-ui, with 27 AI-native landing page components."
  />
</svelte:head>

<div class="docs" data-theme={theme}>
  <StickyBanner>
    performative-ui-svelte is a full Svelte port of the MIT React original
  </StickyBanner>

  <header class="hero">
    <Aurora animated />
    <NodeGraphBackground density={38} baseOpacity={0.25} />
    <FloatingSparkles count={16} />
    <nav class="nav" aria-label="Primary">
      <a href="#top" class="brand">performative-ui-svelte</a>
      <div class="nav__links">
        <a href="#catalog">Catalog</a>
        <a href="#examples">Examples</a>
        <a href="https://github.com/adv0r/performative-ui-svelte">GitHub</a>
      </div>
      <div class="theme-toggle" role="group" aria-label="Theme">
        <button class:active={theme === "dark"} onclick={() => setTheme("dark")}>Dark</button>
        <button class:active={theme === "light"} onclick={() => setTheme("light")}>Light</button>
      </div>
    </nav>

    <div id="top" class="hero__content">
      <EyebrowPill>27 components · MIT licensed · Svelte 5</EyebrowPill>
      <h1>
        AI-native Svelte components for
        <GradientText>
          <WordRoll words={["startups", "demos", "landing pages", "agent apps"]} gradient />
        </GradientText>
      </h1>
      <p>
        A faithful Svelte port of performative-ui: the same theatrical components,
        now packaged for Svelte projects.
      </p>
      <PromptHero
        placeholder="Describe the overfunded interface..."
        onSubmit={(value: string) => (promptResult = `PromptHero submitted: ${value || "(empty)"}`)}
      />
      <div class="hero__actions">
        <Button as="a" href="#examples" variant="glow" sparkle>View examples</Button>
        <Button as="a" href="https://github.com/vorpus/performativeUI" variant="ghost">Original React project</Button>
      </div>
      <p class="status-line"><StatusDot /> {promptResult}</p>
    </div>
  </header>

  <main>
    <section id="catalog" class="section">
      <div class="section__head">
        <EyebrowPill icon={false}>Catalog</EyebrowPill>
        <h2>Every original component, ported</h2>
      </div>
      {#each categories as category}
        <div class="category">
          <h3>{category}</h3>
          <div class="catalog-grid">
            {#each components.filter((component) => component.category === category) as component}
              <article class="catalog-card">
                <div>
                  <p class="catalog-card__category">{component.category}</p>
                  <h4>{component.name}</h4>
                  <p>{component.snark}</p>
                </div>
                <code>{component.props}</code>
              </article>
            {/each}
          </div>
        </div>
      {/each}
    </section>

    <section id="examples" class="section examples">
      <div class="section__head">
        <EyebrowPill>Live examples</EyebrowPill>
        <h2>Enough demo surface to verify the port</h2>
      </div>

      <div class="example-band compact">
        <h3>Atoms and primitives</h3>
        <div class="inline-demo">
          <span class="large-inline">Generate <Sparkle /></span>
          <GradientText as="strong">Gradient text</GradientText>
          <span class="status-line"><StatusDot color="#fbbf24" /> Degraded optimism</span>
          <Button variant="glow" sparkle>Generate</Button>
          <Button variant="shimmer">Start building</Button>
          <Button variant="ghost">Talk to sales</Button>
          <Button variant="solid">Upgrade</Button>
          <Button variant="wave">Request demo</Button>
        </div>
      </div>

      <div class="example-band">
        <h3>Prompt input</h3>
        <Prompt
          onSubmit={(value: string, ctx: { model?: string }) => (promptResult = `Prompt submitted to ${ctx.model}: ${value || "(empty)"}`)}
          toolbarExtras={cmdHint}
        />
        <p class="status-line">{promptResult}</p>
      </div>

      <div class="example-grid">
        <GlassCard breathing>
          <GlassCardIcon>+</GlassCardIcon>
          <GlassCardTitle>Reason over everything</GlassCardTitle>
          <GlassCardBody>
            Multi-step, multi-modal, multi-vendor workflows, presented as if the demo already closed the round.
          </GlassCardBody>
          <GlassCardLink href="#catalog">Inspect catalog</GlassCardLink>
        </GlassCard>

        <MockIDE filename="route.ts" tokens={codeTokens} />
      </div>

      <div class="example-grid">
        <div class="conversation">
          <ChatBubble role="user">Can you automate our entire roadmap?</ChatBubble>
          <ChatBubble role="ai" agent="Synthi" thinking="reasoning...">
            <TokenStream
              text="Yes. I have created a 14-step plan, a waitlist form, and a gradient."
              loop
            />
          </ChatBubble>
        </div>

        <div class="ascii-wrap">
          <AsciiHero colorful baseOpacity={0.45} spotlightOpacity={1} />
        </div>
      </div>

      <div class="example-band">
        <h3>Social proof</h3>
        <LogoMarquee {logos} pauseOnHover />
        <LogoRow heading="Backed by operators from" {logos} />
        <div class="stats">
          <p><StatCounter target={51842} /> builders joined</p>
          <CommunityBadge
            href="https://github.com/adv0r/performative-ui-svelte"
            title="Star us on GitHub"
            subtitle="1,337 stars · +184 this week"
          />
        </div>
      </div>

      <div class="example-grid pricing-grid">
        <PricingCard featured>
          <PricingCardFlag>Most performative</PricingCardFlag>
          <PricingCardTier>Pro</PricingCardTier>
          <PricingCardAmount unit="/mo">$49</PricingCardAmount>
          <PricingCardBlurb>For founders who need an agentic website before revenue.</PricingCardBlurb>
          <PricingCardFeatures>
            <li>Unlimited prompts</li>
            <li>Priority shimmer</li>
            <li>Investor-grade blur</li>
          </PricingCardFeatures>
          <PricingCardCTA href="#examples">Upgrade</PricingCardCTA>
        </PricingCard>

        <BeforeAfter
          brand="Synthetica"
          before={["Manual onboarding", "Messy dashboards", "Stakeholders asking for ROI"]}
          after={["Autonomous agents", "One animated command center", "A crisp waitlist metric"]}
        />
      </div>

      <div class="example-band">
        <h3>Conversion</h3>
        <WaitlistForm
          footnote="No spam. Just weekly gradients."
          onSubmit={(email: string) => (waitlistResult = `Waitlist submitted: ${email || "(empty)"}`)}
        />
        <p class="status-line">{waitlistResult}</p>
        <Button variant="ghost" onclick={() => (popoverOpen = true)}>Open popover</Button>
      </div>
    </section>
  </main>

  <ChatFAB>
    {#snippet popover()}
      <ChatFABHeader>Hi, I am Synthi.</ChatFABHeader>
      <ChatFABBody>
        Ask me anything about gradients, agent workflows, or valuation optics.
      </ChatFABBody>
    {/snippet}
  </ChatFAB>

  <Popover
    open={popoverOpen}
    onOpenChange={(open: boolean) => (popoverOpen = open)}
    title="Join the waitlist"
    closeLabel="Maybe later"
    closeOnEscape
    closeOnBackdrop
  >
    <WaitlistForm onSubmit={(email: string) => {
      waitlistResult = `Popover waitlist submitted: ${email || "(empty)"}`;
      popoverOpen = false;
    }} />
  </Popover>
</div>

{#snippet cmdHint()}
  <span class="cmd-hint">Cmd+Enter</span>
{/snippet}

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    background: var(--pui-bg);
    color: var(--pui-fg);
    font-family: var(--pui-font-sans);
  }

  :global(*) {
    box-sizing: border-box;
  }

  .docs {
    min-height: 100vh;
    background:
      radial-gradient(circle at 20% 0%, rgba(124, 58, 237, 0.15), transparent 30%),
      radial-gradient(circle at 90% 20%, rgba(6, 182, 212, 0.13), transparent 28%),
      var(--pui-bg);
  }

  .hero {
    position: relative;
    min-height: min(860px, calc(100svh - 120px));
    overflow: hidden;
    border-bottom: 1px solid var(--pui-border);
  }

  .nav {
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    max-width: 1180px;
    margin: 0 auto;
    padding: 22px;
  }

  .brand,
  .nav a {
    color: var(--pui-fg);
    text-decoration: none;
  }

  .brand {
    font-weight: 800;
  }

  .nav__links {
    display: flex;
    gap: 18px;
    color: var(--pui-fg-dim);
    font-size: 14px;
  }

  .theme-toggle {
    display: inline-flex;
    gap: 4px;
    padding: 3px;
    border: 1px solid var(--pui-border);
    border-radius: 9px;
    background: var(--pui-glass-soft);
  }

  .theme-toggle button {
    border: 0;
    border-radius: 7px;
    padding: 7px 10px;
    color: var(--pui-fg-dim);
    background: transparent;
    cursor: pointer;
  }

  .theme-toggle button.active {
    color: var(--pui-fg);
    background: var(--pui-overlay-strong);
  }

  .hero__content {
    position: relative;
    z-index: 4;
    display: grid;
    gap: 22px;
    max-width: 920px;
    margin: 0 auto;
    padding: clamp(56px, 8vw, 110px) 22px 72px;
    text-align: center;
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin-top: 0;
  }

  h1 {
    margin-bottom: 0;
    font-size: clamp(44px, 7vw, 88px);
    line-height: 0.95;
    letter-spacing: 0;
  }

  h2 {
    margin-bottom: 0;
    font-size: clamp(30px, 4vw, 52px);
    line-height: 1;
    letter-spacing: 0;
  }

  h3 {
    margin-bottom: 16px;
    font-size: 20px;
  }

  .hero__content > p {
    max-width: 660px;
    margin: 0 auto;
    color: var(--pui-fg-dim);
    font-size: 18px;
    line-height: 1.7;
  }

  .hero__actions,
  .inline-demo,
  .stats {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .section {
    max-width: 1180px;
    margin: 0 auto;
    padding: 76px 22px;
  }

  #catalog {
    padding-top: 40px;
  }

  .section__head {
    display: grid;
    gap: 16px;
    margin-bottom: 34px;
  }

  .category {
    margin-top: 34px;
  }

  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
  }

  .catalog-card,
  .example-band,
  .conversation,
  .ascii-wrap {
    border: 1px solid var(--pui-border);
    border-radius: var(--pui-radius);
    background: var(--pui-glass-soft);
    box-shadow: var(--pui-shadow-card);
  }

  .catalog-card {
    display: grid;
    align-content: space-between;
    min-height: 190px;
    padding: 18px;
  }

  .catalog-card__category {
    margin-bottom: 8px;
    color: var(--pui-fg-mute);
    font-size: 12px;
    text-transform: uppercase;
  }

  .catalog-card h4 {
    margin-bottom: 8px;
    font-size: 18px;
  }

  .catalog-card p {
    color: var(--pui-fg-dim);
    line-height: 1.55;
  }

  code,
  .cmd-hint {
    font-family: var(--pui-font-mono);
    font-size: 12px;
  }

  code {
    color: var(--pui-fg-dim);
  }

  .examples {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
  }

  .examples > *,
  .example-grid > * {
    min-width: 0;
  }

  .example-band {
    width: 100%;
    min-width: 0;
    padding: 24px;
  }

  .compact {
    display: grid;
    gap: 16px;
  }

  .example-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }

  .pricing-grid {
    grid-template-columns: minmax(280px, 0.75fr) minmax(0, 1.25fr);
  }

  .conversation,
  .ascii-wrap {
    min-height: 340px;
    padding: 22px;
  }

  .conversation {
    display: grid;
    align-content: center;
    gap: 14px;
  }

  .ascii-wrap {
    display: grid;
    place-items: center;
  }

  .large-inline {
    font-size: 30px;
    font-weight: 700;
  }

  .status-line {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--pui-fg-dim);
    font-size: 14px;
  }

  .cmd-hint {
    color: var(--pui-fg-mute);
  }

  @media (max-width: 760px) {
    .nav {
      align-items: flex-start;
      flex-direction: column;
    }

    .nav__links {
      flex-wrap: wrap;
    }

    .example-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .hero__content {
      gap: 16px;
      padding-top: 34px;
      padding-bottom: 24px;
      text-align: left;
    }

    h1 {
      font-size: 40px;
      line-height: 1;
    }

    .hero__content > p {
      font-size: 16px;
      line-height: 1.55;
    }

    .hero .status-line {
      max-width: calc(100% - 118px);
      justify-content: flex-start;
    }

    #catalog {
      padding-top: 24px;
    }

    .hero__actions,
    .inline-demo,
    .stats {
      justify-content: flex-start;
    }
  }
</style>
