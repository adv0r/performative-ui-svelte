import { getContext, setContext } from "svelte";

const KEY = Symbol("performative-ui-svelte-chat-fab-close");

export function setChatFABClose(close: () => void) {
  setContext(KEY, close);
}

export function getChatFABClose() {
  return getContext<() => void>(KEY) ?? (() => {});
}
