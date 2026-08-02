

<h1 align="center">performative-ui-svelte</h1>

<p align="center">
  Componentes de Svelte nativos para IA que indican qué tan sobre suscrito está tu ronda de financiación.
</p>

<p align="center">
  <a href="https://adv0r.github.io/performative-ui-svelte/"><b>Documentación</b></a>
  ·
  <a href="https://github.com/adv0r/performative-ui-svelte"><b>GitHub</b></a>
  ·
  <a href="https://github.com/vorpus/performativeUI"><b>Proyecto original de React</b></a>
</p>

## Documentación

Documentación en vivo en [adv0r.github.io/performative-ui-svelte](https://adv0r.github.io/performative-ui-svelte/):

- **Páginas por componente** con ejemplos en vivo, tablas de props y fragmentos de instalación
- **Guía de inicio rápido** — instalación desde GitHub, no se requiere Tailwind
- **Generador de temas** — ajusta las propiedades CSS personalizadas `--pui-*` y copia el bloque
- **Referencia de acciones** — `createTypewriter`, `createCounter`, `createTokenStream`, `asciiField`
- **llms.txt** — catálogo legible por máquinas para herramientas de IA

## Instalación

El paquete aún no se ha publicado en el registro de npm. Para la v1, instálalo directamente desde GitHub:

```bash
npm install github:adv0r/performative-ui-svelte#main
```

Fija una rama, etiqueta o commit cuando necesites instalaciones reproducibles:

```bash
npm install github:adv0r/performative-ui-svelte#conductor/vorpus-svelte-port
npm install github:adv0r/performative-ui-svelte#<commit-sha-or-tag>
```

La instalación desde GitHub ejecuta el script `prepare` del paquete, que compila `dist/` con `@sveltejs/package`. Mantén habilitados los scripts de ciclo de vida para esta dependencia. Si tu entorno de instalación deshabilita los scripts, utiliza el flujo de tarball en su lugar:

```bash
# in this repo
npm install
npm pack

# in the consuming app
npm install /path/to/performative-ui-svelte-0.1.0.tgz
```

Importa los estilos globales de los componentes una sola vez:

```svelte
<script>
  import "performative-ui-svelte/styles.css";
  import { Button, GradientText, Sparkle } from "performative-ui-svelte";
</script>

<h1>Ship <GradientText>agentic workflows</GradientText> <Sparkle /></h1>
<Button variant="glow" sparkle>Generate</Button>
```

## Componentes

Este puerto incluye los 28 componentes del catálogo original:

- Átomos: `Sparkle`, `GradientText`, `StatusDot`
- Primitivos: `Button`, `EyebrowPill`, `Prompt`, `StickyBanner`
- Portadas: `Rotator`, `WordRoll`, `PromptHero`, `AsciiHero`
- Fondos: `Aurora`, `NodeGraphBackground`, `FloatingSparkles`
- Superficies: `GlassCard`, `MockIDE`
- Conversación: `ChatBubble`, `TokenStream`, `ChatFAB`
- Prueba social: `LogoMarquee`, `LogoRow`, `SlippyWords`, `StatCounter`, `CommunityBadge`
- Precios y conversión: `PricingCard`, `BeforeAfter`, `WaitlistForm`, `Popover`

Los componentes compuestos de React se adaptaron a exportaciones nombradas de Svelte:

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

## Desarrollo

```bash
npm install
npm run check
npm run package
npm run build
npm pack --dry-run
```

## Atribución

Este proyecto es un puerto a Svelte de [performative-ui](https://github.com/vorpus/performativeUI) creado por vorpus. El paquete original está marcado con licencia MIT en sus metadatos y README.

## Licencia

MIT
