import type { TypewriterOptions } from "../types.js";

export function createTypewriter({
  words,
  typeMs = 70,
  deleteMs = 32,
  holdMs = 1500,
  loop = true,
  onWordReached
}: TypewriterOptions) {
  let word = $state("");
  let index = $state(0);
  let isDeleting = $state(false);
  let isComplete = $state(false);

  $effect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    if (!words.length) return;

    const tick = () => {
      if (cancelled) return;
      const target = words[index] ?? "";
      const next = isDeleting
        ? target.slice(0, Math.max(0, word.length - 1))
        : target.slice(0, word.length + 1);

      word = next;

      if (!isDeleting && next === target) {
        onWordReached?.(target, index);
        if (!loop && index === words.length - 1) {
          isComplete = true;
          return;
        }
        timer = setTimeout(() => {
          if (cancelled) return;
          isDeleting = true;
          timer = setTimeout(tick, deleteMs);
        }, holdMs);
        return;
      }

      if (isDeleting && next === "") {
        isDeleting = false;
        index = (index + 1) % words.length;
      }

      timer = setTimeout(tick, isDeleting ? deleteMs : typeMs);
    };

    timer = setTimeout(tick, typeMs);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  });

  return {
    get word() {
      return word;
    },
    get index() {
      return index;
    },
    get isDeleting() {
      return isDeleting;
    },
    get isComplete() {
      return isComplete;
    }
  };
}
