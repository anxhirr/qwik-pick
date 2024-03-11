import {
  component$,
  useSignal,
  Slot,
  $,
  useContextProvider,
} from "@builder.io/qwik"
import { MenuContext } from "./menu"
import { InputContext } from "./input"
import { OptionsContext } from "./options"
import { OptionType } from "../types"
import { getFilteredOptions } from "../utils"

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

  const possibleOptions = useSignal<OptionType[]>([])
  const filteredOptions = useSignal<OptionType[]>([])
  const selectedOptions = useSignal<OptionType[]>([])
  const hoveredOptionIndex = useSignal<number>(-1)

  useContextProvider(OptionsContext, {
    possibleOptions,
    filteredOptions,
    selectedOptions,
    hoveredOptionIndex,
    actions: {
      filter: $(() => {
        filteredOptions.value = getFilteredOptions(
          possibleOptions.value,
          selectedOptions.value,
          inputSig.value
        )
      }),
      resetFilteredList: $(() => {
        filteredOptions.value = possibleOptions.value
      }),
      selectOption: $((option: OptionType) => {
        selectedOptions.value = [...selectedOptions.value, option]
      }),
      populate: $((options: OptionType[]) => {
        possibleOptions.value = options
        filteredOptions.value = options
      }),
    },
  })

  return <Slot />
})
