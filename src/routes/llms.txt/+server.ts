import { COMPONENTS, DOCS_BASE_URL, PACKAGE_REPO } from "$lib/docs/catalog.js";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = () => {
  const lines = [
    "# performative-ui-svelte",
    "",
    "AI-native Svelte 5 components — port of vorpus/performativeUI.",
    "",
    `Install: ${PACKAGE_REPO}`,
    `Docs: ${DOCS_BASE_URL}`,
    "",
    "## Components",
    ""
  ];

  for (const c of COMPONENTS) {
    lines.push(`### ${c.name} (${c.slug})`);
    lines.push(`Category: ${c.category}`);
    lines.push(c.description);
    lines.push(`Docs: ${DOCS_BASE_URL}/components/${c.slug}`);
    lines.push(`Import: import { ${c.name} } from "performative-ui-svelte";`);
    if (c.props.length) {
      lines.push("Props:");
      for (const p of c.props) {
        lines.push(`- ${p.name}${p.required ? " (required)" : ""}: ${p.type}${p.default ? ` = ${p.default}` : ""} — ${p.desc}`);
      }
    }
    lines.push("");
  }

  lines.push("## Actions");
  lines.push("- createTypewriter — typewriter cycling helper");
  lines.push("- createCounter — animated counter helper");
  lines.push("- createTokenStream — token streaming helper");
  lines.push("- asciiField — canvas ASCII background action");
  lines.push("- cn — className merge helper");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
