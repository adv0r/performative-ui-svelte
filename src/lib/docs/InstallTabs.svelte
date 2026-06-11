<script lang="ts">
  import CodeBlock from "./CodeBlock.svelte";
  import CommandTabs from "./CommandTabs.svelte";
  import { PACKAGE_REPO } from "./catalog.js";

  let { componentName }: { componentName: string } = $props();

  type ManagerId = "npm" | "pnpm" | "bun" | "yarn";

  const managers = [
    { id: "npm" as const, label: "npm", install: `npm install ${PACKAGE_REPO}` },
    { id: "pnpm" as const, label: "pnpm", install: `pnpm add ${PACKAGE_REPO}` },
    { id: "bun" as const, label: "bun", install: `bun add ${PACKAGE_REPO}` },
    { id: "yarn" as const, label: "yarn", install: `yarn add ${PACKAGE_REPO}` }
  ];

  let mode = $state<"package" | "import">("package");
  let manager = $state<ManagerId>("npm");

  const installCode = $derived(managers.find((m) => m.id === manager)?.install ?? managers[0].install);
  const importCode = $derived(`import "performative-ui-svelte/styles.css";
import { ${componentName} } from "performative-ui-svelte";`);
</script>

<div class="install-tabs">
  <div class="install-tabs__strip" role="tablist" aria-label="Install method">
    <button
      type="button"
      role="tab"
      aria-selected={mode === "package"}
      class="install-tab"
      class:install-tab--active={mode === "package"}
      onclick={() => (mode = "package")}
    >
      Install package
    </button>
    <button
      type="button"
      role="tab"
      aria-selected={mode === "import"}
      class="install-tab"
      class:install-tab--active={mode === "import"}
      onclick={() => (mode = "import")}
    >
      Import
    </button>
  </div>

  {#if mode === "package"}
    <p class="cp-install-copy">
      One dependency, one CSS import, zero Tailwind setup. Pin a branch or commit in the URL when you need reproducible installs.
    </p>
    <CommandTabs
      tabs={managers.map((m) => ({ id: m.id, label: m.label }))}
      selected={manager}
      onSelect={(id) => (manager = id as ManagerId)}
      code={`${installCode}

# Import global styles once in your root layout:
# import "performative-ui-svelte/styles.css";`}
    />
  {:else}
    <p class="cp-install-copy">After installing the package, import the component and styles once.</p>
    <CodeBlock code={importCode} />
  {/if}
</div>
