<script lang="ts">
  let {
    tabs,
    selected,
    onSelect,
    code
  }: {
    tabs: Array<{ id: string; label: string }>;
    selected: string;
    onSelect: (id: string) => void;
    code: string;
  } = $props();
</script>

<div class="install-tabs">
  <div class="install-tabs__strip" role="tablist" aria-label="Package manager">
    {#each tabs as tab (tab.id)}
      <button
        type="button"
        role="tab"
        aria-selected={selected === tab.id}
        class="install-tab"
        class:install-tab--active={selected === tab.id}
        onclick={() => onSelect(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  <div class="example__code">
    <pre class="code-block">{code.trim()}</pre>
  </div>
</div>
