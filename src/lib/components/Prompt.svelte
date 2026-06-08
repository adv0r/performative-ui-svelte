<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = Omit<HTMLFormAttributes, "onchange" | "onsubmit"> & {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string, ctx: { model?: string }) => void;
    placeholder?: string;
    rows?: number;
    models?: string[];
    model?: string;
    defaultModel?: string;
    onModelChange?: (model: string) => void;
    onAddContext?: () => void;
    onVoice?: () => void;
    hideAddContext?: boolean;
    hideModel?: boolean;
    hideVoice?: boolean;
    hideSend?: boolean;
    submitOnCmdEnter?: boolean;
    toolbarExtras?: Snippet;
  };

  const DEFAULT_MODELS = ["GPT-5 Turbo Vision", "Claude Opus 4.7", "Gemini 3 Pro"];

  let {
    value,
    defaultValue = "",
    onChange,
    onSubmit,
    placeholder = "Build me a...",
    rows = 3,
    models = DEFAULT_MODELS,
    model,
    defaultModel,
    onModelChange,
    onAddContext,
    onVoice,
    hideAddContext = false,
    hideModel = false,
    hideVoice = false,
    hideSend = false,
    submitOnCmdEnter = true,
    toolbarExtras,
    class: className = "",
    ...rest
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let internalValue = $state(defaultValue);
  // svelte-ignore state_referenced_locally
  let internalModel = $state(defaultModel ?? models[0] ?? "");
  let menuOpen = $state(false);
  let modelWrap = $state<HTMLDivElement>();

  let currentValue = $derived(value !== undefined ? value : internalValue);
  let currentModel = $derived(model !== undefined ? model : internalModel);

  function setValue(next: string) {
    if (value === undefined) internalValue = next;
    onChange?.(next);
  }

  function setModel(next: string) {
    if (model === undefined) internalModel = next;
    onModelChange?.(next);
    menuOpen = false;
  }

  function submit(e: SubmitEvent) {
    e.preventDefault();
    onSubmit?.(currentValue, { model: currentModel });
  }

  function keydown(e: KeyboardEvent) {
    if (submitOnCmdEnter && e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit?.(currentValue, { model: currentModel });
    }
  }

  const onDown = (e: MouseEvent) => {
    if (menuOpen && modelWrap && !modelWrap.contains(e.target as Node)) {
      menuOpen = false;
    }
  };

  onMount(() => {
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  });
</script>

<form class={cn("pui-promptbox", className)} onsubmit={submit} {...rest}>
  <textarea
    class="pui-promptbox__textarea"
    {placeholder}
    {rows}
    value={currentValue}
    oninput={(e) => setValue(e.currentTarget.value)}
    onkeydown={keydown}
  ></textarea>
  <div class="pui-promptbox__toolbar">
    {#if !hideAddContext}
      <button type="button" class="pui-promptbox__iconbtn" aria-label="Add context" onclick={onAddContext}>
        +
      </button>
    {/if}
    {#if !hideModel}
      <div class="pui-promptbox__model-wrap" bind:this={modelWrap}>
        <button
          type="button"
          class="pui-promptbox__model"
          aria-expanded={menuOpen}
          onclick={() => (menuOpen = !menuOpen)}
        >
          <span>{currentModel}</span>
          <span aria-hidden="true">v</span>
        </button>
        {#if menuOpen}
          <div class="pui-promptbox__menu" role="menu">
            {#each models as m}
              <button
                type="button"
                class={cn("pui-promptbox__menu-item", m === currentModel && "pui-promptbox__menu-item--active")}
                onclick={() => setModel(m)}
              >
                <span>{m}</span>
                {#if m === currentModel}
                  <span aria-hidden="true">✓</span>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
    <div class="pui-promptbox__spacer"></div>
    {@render toolbarExtras?.()}
    {#if !hideVoice}
      <button type="button" class="pui-promptbox__iconbtn" aria-label="Voice" onclick={onVoice}>
        mic
      </button>
    {/if}
    {#if !hideSend}
      <button type="submit" class="pui-promptbox__iconbtn pui-promptbox__send" aria-label="Send">
        -&gt;
      </button>
    {/if}
  </div>
</form>
