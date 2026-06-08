import type { TokenStreamOptions } from "../types.js";

const defaultTokenize = (s: string) => s.split(/(\s+)/);

export function createTokenStream({
  text,
  speedMs = [18, 80],
  tokenize = defaultTokenize,
  loop = false,
  loopDelayMs = 6000,
  onComplete
}: TokenStreamOptions) {
  let output = $state("");
  let isComplete = $state(false);

  $effect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tokens = tokenize(text);

    const pickDelay = () =>
      Array.isArray(speedMs)
        ? speedMs[0] + Math.random() * (speedMs[1] - speedMs[0])
        : speedMs;

    const run = () => {
      let i = 0;
      let buffer = "";
      const tick = () => {
        if (cancelled) return;
        if (i >= tokens.length) {
          isComplete = true;
          onComplete?.();
          if (loop) {
            timer = setTimeout(() => {
              if (cancelled) return;
              isComplete = false;
              output = "";
              run();
            }, loopDelayMs);
          }
          return;
        }
        buffer += tokens[i];
        i += 1;
        output = buffer;
        timer = setTimeout(tick, pickDelay());
      };
      tick();
    };

    run();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  });

  return {
    get output() {
      return output;
    },
    get isStreaming() {
      return !isComplete;
    },
    get isComplete() {
      return isComplete;
    }
  };
}
