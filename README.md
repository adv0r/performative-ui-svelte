<h1 align="center">performative-ui-svelte</h1>

<p align="center">
  AI-native Svelte components that signal how oversubscribed your funding round is.
</p>

<p align="center">
  <a href="https://adv0r.github.io/performative-ui-svelte/"><b>Documentation</b></a>
  ·
  <a href="https://github.com/adv0r/performative-ui-svelte"><b>GitHub</b></a>
  ·
  <a href="https://github.com/vorpus/performativeUI"><b>Original React project</b></a>
</p>

## Install

```bash
npm install performative-ui-svelte
```

Import the global component styles once:

```svelte
<script>
  import "performative-ui-svelte/styles.css";
  import { Button, GradientText, Sparkle } from "performative-ui-svelte";
</script>

<h1>Ship <GradientText>agentic workflows</GradientText> <Sparkle /></h1>
<Button variant="glow" sparkle>Generate</Button>
```

## Components

The port includes all 27 components from the original catalog:

- Atoms: `Sparkle`, `GradientText`, `StatusDot`
- Primitives: `Button`, `EyebrowPill`, `Prompt`, `StickyBanner`
- Heroes: `Rotator`, `WordRoll`, `PromptHero`, `AsciiHero`
- Backgrounds: `Aurora`, `NodeGraphBackground`, `FloatingSparkles`
- Surfaces: `GlassCard`, `MockIDE`
- Conversation: `ChatBubble`, `TokenStream`, `ChatFAB`
- Social proof: `LogoMarquee`, `LogoRow`, `StatCounter`, `CommunityBadge`
- Pricing and conversion: `PricingCard`, `BeforeAfter`, `WaitlistForm`, `Popover`

React compound components were adapted to Svelte named exports:

```svelte
<script>
  import {
    GlassCard,
    GlassCardIcon,
    GlassCardTitle,
    GlassCardBody,
    GlassCardLink
  } from "performative-ui-svelte";
</script>

<GlassCard breathing>
  <GlassCardIcon>+</GlassCardIcon>
  <GlassCardTitle>Reason</GlassCardTitle>
  <GlassCardBody>Multi-step, multi-modal, multi-vendor.</GlassCardBody>
  <GlassCardLink href="/learn">Learn more</GlassCardLink>
</GlassCard>
```

## Development

```bash
npm install
npm run check
npm run package
npm run build
npm pack --dry-run
```

## Attribution

This project is a Svelte port of [performative-ui](https://github.com/vorpus/performativeUI) by vorpus. The original package is marked MIT licensed in its package metadata and README.

## License

MIT
