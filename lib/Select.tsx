import {
  $,
  Slot,
  component$,
  useContext,
  useSignal,
  useTask$,
} from "@builder.io/qwik"

import { StoreProvider } from "./store"
import { MenuContext } from "./store/menu"
import { OptionType, ParentEmitFnType } from "./types"
import { getFilteredOptions, isUndefined } from "./utils"
import { Input } from "./components/Input"
import { ClearButton } from "./components/Buttons"
import { Menu } from "./components/Dropdown"
import { InputContext } from "./store/input"

export interface Props {
  value: string | undefined
  options: OptionType[]
  placeholder?: string
  onSelect: ParentEmitFnType
  onClear?: () => void
  isMulti?: boolean
  isCreatable?: true
  onCreate?: ParentEmitFnType
  closeOnOutsideClick?: boolean
  selectedOptions?: OptionType[]
}

const SelectImpl = component$<Props>((props) => {
  const {
    onSelect,
    placeholder = "Select",
    options,
    value,
    isMulti,
    isCreatable,
    onCreate,
    onClear,
    closeOnOutsideClick,
    selectedOptions = [],
  } = props

  const {
    showMenuSig,
    actions: { hideMenu },
  } = useContext(MenuContext)
  const {
    inputSig,
    actions: { clearInput },
  } = useContext(InputContext)

  const possibleOptions = useSignal<OptionType[]>([])
  const filteredOptions = getFilteredOptions(
    options,
    selectedOptions,
    inputSig.value
  )

  const restoreOptions = $(() => (possibleOptions.value = options))

  const handleSelect = $(
    (
      option: OptionType,
      menuOptIdx: number,
      parentEmitFn: ParentEmitFnType
    ) => {
      inputSig.value = option.label

      if (isMulti) clearInput()
      hideMenu()

      parentEmitFn({
        newOpt: option,
        menuOptIdx,
      })
    }
  )

  const handleClear = $(() => {
    clearInput()
    onClear?.()
  })

  useTask$(({ track }) => {
    // populates initial options
    track(() => options)
    restoreOptions()
  })

  useTask$(({ track }) => {
    track(() => value)
    if (isUndefined(value)) return
    // input.value = value
  })

  return (
    <div class={"relative max-w-xs"}>
      <div
        class={
          "min-h-12 flex h-full rounded-lg border border-base-content border-opacity-20 p-2"
        }
      >
        {isMulti && (
          <div class="flex flex-wrap items-center gap-2 overflow-hidden">
            <Slot />
          </div>
        )}
        <>
          <Input placeholder={placeholder} />
        </>

        <ClearButton onClear={handleClear} />
      </div>
      {showMenuSig.value && (
        <div class="absolute top-[100%] z-50 w-full">
          <Menu
            options={filteredOptions}
            onSelect={$((option: OptionType, menuOptIdx: number) => {
              handleSelect(option, menuOptIdx, onSelect)
            })}
            onCreate={$((option: OptionType, menuOptIdx: number) => {
              handleSelect(option, menuOptIdx, onCreate as ParentEmitFnType)
            })}
            isCreatable={isCreatable}
          />
        </div>
      )}
    </div>
  )
})

export const Select = component$<Props>((props) => {
  return (
    <StoreProvider>
      <SelectImpl {...props} />
    </StoreProvider>
  )
})
