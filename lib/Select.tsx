import {
  $,
  Slot,
  component$,
  useContext,
  useOn,
  useTask$,
} from "@builder.io/qwik"

import { StoreProvider } from "./store"
import { MenuContext } from "./store/menu"
import { OptionType, ParentEmitFnType } from "./types"
import { isUndefined } from "./utils"
import { Input } from "./components/Input"
import { ClearButton } from "./components/Buttons"
import { Menu } from "./components/Dropdown"
import { InputContext } from "./store/input"
import styles from "./styles.module.css"
import { OptionsContext } from "./store/options"

type OnChangeFnType = (selected: OptionType | OptionType[]) => void

export interface Props {
  options: OptionType[]
  onChange: OnChangeFnType

  initialValue?: string
  defaultOption?: OptionType
  defaultOptions?: OptionType[]
  onSelect?: ParentEmitFnType
  onCreate?: ParentEmitFnType
  placeholder?: string
  isMulti?: boolean
  isCreatable?: boolean
  closeMenuOnSelect?: boolean
}

const SelectImpl = component$<Props>((props) => {
  const {
    options,
    onChange,
    initialValue,
    defaultOption,
    defaultOptions,
    onSelect,
    onCreate,
    placeholder = "Select",
    isMulti = false,
    isCreatable,
    closeMenuOnSelect = true,
  } = props

  const {
    showMenuSig,
    actions: { hideMenu },
  } = useContext(MenuContext)
  const {
    inputSig,
    actions: { clearInput, blurInput },
  } = useContext(InputContext)
  const {
    selectedOptions,
    hoveredOptionIndex,
    actions: { filter, populate, selectOption },
    filteredOptions,
  } = useContext(OptionsContext)

  const handleSelect = $(
    (
      option: OptionType,
      menuOptIdx: number,
      parentEmitFn: ParentEmitFnType | undefined
    ) => {
      isMulti ? clearInput() : (inputSig.value = option.label)

      selectOption(option)

      filter(isMulti)

      if (closeMenuOnSelect) {
        hideMenu()
      }

      parentEmitFn?.({ newOpt: option, menuOptIdx })
    }
  )

  useTask$(({ track }) => {
    track(() => selectedOptions)
    onChange(selectedOptions.value)
  })

  useTask$(({ track }) => {
    // populates initial options
    track(() => options)
    populate(options)
  })

  useTask$(() => {
    // populate initial values
    if (!isUndefined(initialValue)) inputSig.value = initialValue
    selectedOptions.value =
      defaultOptions || (defaultOption ? [defaultOption] : [])
  })

  useOn(
    "keydown",
    $((e) => {
      const isArrowDown = e.key === "ArrowDown"
      const isArrowUp = e.key === "ArrowUp"
      const isEnter = e.key === "Enter"

      if (isEnter) {
        handleSelect(
          filteredOptions.value[hoveredOptionIndex.value],
          hoveredOptionIndex.value,
          onSelect
        )

        blurInput()
      }

      if (isArrowDown || isArrowUp) {
        hoveredOptionIndex.value = Math.max(
          0,
          Math.min(
            filteredOptions.value.length - 1,
            hoveredOptionIndex.value + (isArrowDown ? 1 : -1)
          )
        )
      }
    })
  )

  useOn(
    "focusout",
    $(() => {})
  )

  return (
    <div class={styles["qp-container"]}>
      <div class={styles["qp-wrapper"]}>
        {isMulti && (
          <div class="flex flex-wrap items-center gap-2 overflow-hidden">
            <Slot />
          </div>
        )}

        <Input placeholder={placeholder} />
        <ClearButton />
      </div>
      {showMenuSig.value && (
        <div class="absolute top-[100%] z-50 w-full">
          <Menu
            options={filteredOptions.value}
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
