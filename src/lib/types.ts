import type { Snippet } from "svelte";

export type ButtonVariant = "glow" | "shimmer" | "ghost" | "solid" | "wave";
export type ButtonSize = "sm" | "md" | "lg";
export type ChatRole = "user" | "ai";
export type IdeTokenClass = "key" | "str" | "num" | "com" | "fn" | "";

export interface IdeToken {
  c: string;
  cls?: IdeTokenClass;
}

export type LogoTextStyle = "sans" | "serif" | "italic" | "bold";

export type MarqueeItem =
  | { kind: "img"; src: string; alt?: string }
  | { kind: "text"; text: string; style?: LogoTextStyle; key?: string };

export type LogoRowItem = MarqueeItem;

/** A single SlippyWords badge. A bare string is shorthand for `{ label }`. */
export type SlippyWord =
  | string
  | { label: string | Snippet; key?: string; gradient?: boolean };

export interface TypewriterOptions {
  words: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  loop?: boolean;
  onWordReached?: (word: string, index: number) => void;
}

export interface TokenStreamOptions {
  text: string;
  speedMs?: number | [number, number];
  tokenize?: (text: string) => string[];
  loop?: boolean;
  loopDelayMs?: number;
  onComplete?: () => void;
}

export interface CounterOptions {
  target: number;
  durationMs?: number;
  from?: number;
  ease?: (t: number) => number;
}

export interface AsciiFieldOptions {
  cols?: number;
  rows?: number;
  fontSize?: number;
  fontFamily?: string;
  charRamp?: string;
  colorful?: boolean;
  palette?: string[];
  baseOpacity?: number;
  reactive?: boolean;
  rippleStrength?: number;
  rippleRadius?: number;
  spotlightOpacity?: number;
  spotlightRadius?: number;
  frameMs?: number;
}

export type SnippetOrText = Snippet | string | number | false | null | undefined;
