import { browser } from "$app/environment";
import { getContext, setContext } from "svelte";
import {
  DEFAULT_RADIUS_PX,
  FONT_PRESETS,
  PRESETS,
  buildThemeCss,
  defaultsFor,
  resolvePreset,
  themeEntries,
  type Base,
  type Preset
} from "./theme-presets.js";

export const PROP_NAMES = themeEntries({
  base: "dark",
  colors: defaultsFor("dark"),
  radiusPx: DEFAULT_RADIUS_PX,
  font: FONT_PRESETS[0].value
}).map(([k]) => k);

const THEME_KEY = Symbol("pui-site-theme");

export class SiteTheme {
  #base = $state<Base>("dark");
  #presetId = $state("default");

  constructor(initialBase: Base = "dark") {
    this.#base = initialBase;
    if (browser) {
      const stored = localStorage.getItem("pui-theme");
      if (stored === "dark" || stored === "light") this.#base = stored;
      const params = new URLSearchParams(window.location.search);
      const mode = params.get("mode");
      if (mode === "dark" || mode === "light") this.#base = mode;
      const theme = params.get("theme");
      if (theme) this.#presetId = theme;
    }
  }

  get base(): Base {
    return this.#base;
  }

  set base(v: Base) {
    this.#base = v;
    if (browser) localStorage.setItem("pui-theme", v);
  }

  get presetId(): string {
    return this.#presetId;
  }

  set presetId(v: string) {
    this.#presetId = v;
  }

  get activePreset(): Preset | null {
    return PRESETS.find((p) => p.id === this.#presetId) ?? null;
  }

  get css(): string {
    return buildThemeCss(this.state);
  }

  get state() {
    const preset = this.activePreset;
    return preset
      ? resolvePreset(preset, this.base)
      : {
          base: this.base,
          colors: defaultsFor(this.base),
          radiusPx: DEFAULT_RADIUS_PX,
          font: FONT_PRESETS[0].value
        };
  }

  toggleBase() {
    this.base = this.base === "dark" ? "light" : "dark";
  }

  reset() {
    this.presetId = "default";
    this.applyToDocument();
  }

  apply(preset: Preset) {
    this.presetId = preset.id;
    this.applyToDocument();
  }

  applyToDocument() {
    if (!browser) return;
    const root = document.documentElement;
    if (!this.activePreset) {
      for (const name of PROP_NAMES) root.style.removeProperty(name);
      return;
    }
    for (const [name, value] of themeEntries(this.state)) {
      root.style.setProperty(name, value);
    }
  }
}

export function createSiteTheme(initialBase: Base = "dark") {
  const theme = new SiteTheme(initialBase);
  setContext(THEME_KEY, theme);
  return theme;
}

export function getSiteTheme() {
  return getContext<SiteTheme>(THEME_KEY);
}
