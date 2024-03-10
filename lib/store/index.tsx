import {
  component$,
  useSignal,
  Slot,
  $,
  useContextProvider,
} from "@builder.io/qwik"
import { MenuContext } from "./menu"
import { InputContext } from "./input"

export const StoreProvider = component$(() => {
  const showMenuSig = useSignal(false)
  const menuRef = useSignal<HTMLElement>()

  const inputSig = useSignal("")
  const inputRef = useSignal<HTMLElement>()

  const showMenu = $(() => (showMenuSig.value = true))
  const hideMenu = $(() => (showMenuSig.value = false))

  useContextProvider(MenuContext, {
    showMenuSig,
    menuRef,

    actions: {
      showMenu,
      hideMenu,
    },
  })

  const clearInput = $(() => (inputSig.value = ""))
  const focusInput = $(() => inputRef.value?.focus())
  const blurInput = $(() => inputRef.value?.blur())

  useContextProvider(InputContext, {
    inputSig,
    inputRef,

    actions: {
      clearInput,
      focusInput,
      blurInput,
    },
  })

  return <Slot />
})
