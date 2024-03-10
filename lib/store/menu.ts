import { QRL, Signal, createContextId } from "@builder.io/qwik"

export const MenuContext = createContextId<{
  showMenuSig: Signal<boolean>
  menuRef: Signal<HTMLElement | undefined>
  actions: {
    showMenu: QRL<() => true>
    hideMenu: QRL<() => false>
  }
}>("MenuContext")
