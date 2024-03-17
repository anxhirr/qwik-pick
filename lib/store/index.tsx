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
      filter: $((isMulti: boolean) => {
        filteredOptions.value = getFilteredOptions(
          possibleOptions.value,
          selectedOptions.value,
          inputSig.value,
          isMulti
        )
      }),
      resetFilteredList: $(() => {
        filteredOptions.value = possibleOptions.value
      }),
      resetSelectedList: $(() => {
        selectedOptions.value = []
      }),
      selectOption: $((option: OptionType) => {
        selectedOptions.value = [...selectedOptions.value, option]
      }),
      removeOption: $((option: OptionType) => {
        selectedOptions.value = selectedOptions.value.filter(
          (opt) => opt.value !== option.value
        )
      }),
      populate: $((options: OptionType[]) => {
        possibleOptions.value = options
        filteredOptions.value = options
      }),
      hoverOnExistingOrFirst: $(() => {
        const hoveredOptionExists = hoveredOptionIndex.value !== -1
        const index = hoveredOptionExists ? hoveredOptionIndex.value : 0

        hoveredOptionIndex.value = index
      }),
    },
  })

  return <Slot />
})
