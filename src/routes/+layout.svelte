<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { COMPONENTS, CATEGORIES, ORDERED_COMPONENTS } from "$lib/docs/catalog.js";
  import ThemePopover from "$lib/docs/ThemePopover.svelte";
  import { createSiteTheme } from "$lib/docs/theme.svelte.js";
  import "$lib/styles.css";
  import "./docs.css";

  let { children } = $props();

  const GUIDE = [
    { name: "Getting Started", href: `${base}/getting-started` },
    { name: "Theming", href: `${base}/getting-started/theming` },
    { name: "Actions", href: `${base}/actions` },
    { name: "Live Demo", href: `${base}/demo` }
  ];

  function detectInitialTheme(): "dark" | "light" {
    if (!browser) return "dark";
    return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  const theme = createSiteTheme(detectInitialTheme());
  let menuOpen = $state(false);
  let pathname = $derived(page.url.pathname);
  let isFullBleed = $derived(pathname === `${base}/demo` || pathname.startsWith(`${base}/demo/`));

  $effect(() => {
    document.documentElement.setAttribute("data-theme", theme.base);
  });

  $effect(() => {
    theme.applyToDocument();
  });

  $effect(() => {
    pathname;
    window.scrollTo(0, 0);
    menuOpen = false;
  });

  $effect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const idx = ORDERED_COMPONENTS.findIndex((c) => `${base}/components/${c.slug}` === pathname);
      const prev = idx > 0 ? ORDERED_COMPONENTS[idx - 1] : null;
      const next = idx >= 0 && idx < ORDERED_COMPONENTS.length - 1 ? ORDERED_COMPONENTS[idx + 1] : null;
      if (e.key === "]" && next) {
        e.preventDefault();
        goto(`${base}/components/${next.slug}`);
      } else if (e.key === "[" && prev) {
        e.preventDefault();
        goto(`${base}/components/${prev.slug}`);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });
</script>

{#if isFullBleed}
  {@render children?.()}
{:else}
  <div class={"docs" + (menuOpen ? " docs--menu-open" : "")}>
    <button
      class="docs__menu-btn"
      aria-label={menuOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      {menuOpen ? "✕" : "☰"}
    </button>
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="docs__backdrop" aria-hidden="true" onclick={() => (menuOpen = false)}></div>

    <aside class="sidebar">
      <div class="sidebar__brand-row">
        <a href={base || "/"} class="sidebar__brand">
          <span class="sidebar__mark">◣</span>
          <span>performative-ui-svelte</span>
        </a>
        <div class="sidebar__actions">
          <ThemePopover />
          <button
            type="button"
            class="sidebar__theme-toggle"
            onclick={() => theme.toggleBase()}
            aria-label={`Switch to ${theme.base === "dark" ? "light" : "dark"} mode`}
          >
            {theme.base === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </div>

      <div class="sidebar__section">
        <p class="sidebar__title">Guide</p>
        <nav class="sidebar__nav">
          {#each GUIDE as item (item.href)}
            <a
              href={item.href}
              class={"sidebar__link" + (pathname === item.href ? " sidebar__link--active" : "")}
            >
              {item.name}
            </a>
          {/each}
        </nav>
      </div>

      {#each CATEGORIES as cat (cat)}
        <div class="sidebar__section">
          <p class="sidebar__title">{cat}</p>
          <nav class="sidebar__nav">
            {#each COMPONENTS.filter((c) => c.category === cat) as c (c.slug)}
              <a
                href="{base}/components/{c.slug}"
                class={"sidebar__link" + (pathname === `${base}/components/${c.slug}` ? " sidebar__link--active" : "")}
              >
                {c.name}
              </a>
            {/each}
          </nav>
        </div>
      {/each}

      <div class="sidebar__footer">
        <a href="https://github.com/adv0r/performative-ui-svelte">GitHub</a>
        <a href="{base}/llms.txt">llms.txt</a>
      </div>
    </aside>

    <main class="main">{@render children?.()}</main>
  </div>
{/if}

<style>
  .sidebar__footer {
    display: flex;
    gap: 12px;
    margin-top: auto;
    padding: 16px 18px 24px;
    color: var(--pui-fg-mute);
    font-size: 12px;
  }

  .sidebar__footer a {
    color: var(--pui-fg-dim);
    text-decoration: none;
  }

  .sidebar__footer a:hover {
    color: var(--pui-fg);
  }
</style>
