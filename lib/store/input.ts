import { QRL, Signal, createContextId } from "@builder.io/qwik"

export const InputContext = createContextId<{
  inputSig: Signal<string>
  inputRef: Signal<HTMLElement | undefined>
  actions: {
    clearInput: QRL<() => "">
    focusInput: QRL<() => void>
    blurInput: QRL<() => void>
  }
}>("InputContext")
