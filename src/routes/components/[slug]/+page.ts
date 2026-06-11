import type { EntryGenerator, PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { COMPONENTS } from "$lib/docs/catalog.js";

export const entries: EntryGenerator = () => COMPONENTS.map((c) => ({ slug: c.slug }));

export const load: PageLoad = ({ params }) => {
  const meta = COMPONENTS.find((c) => c.slug === params.slug);
  if (!meta) error(404, "Component not found.");
  return { meta };
};
