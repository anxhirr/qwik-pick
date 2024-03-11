import { $, Slot, component$, useContext, useTask$ } from "@builder.io/qwik"

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

export interface Props {
  value: string | undefined
  options: OptionType[]
  onSelect: ParentEmitFnType
  onCreate?: ParentEmitFnType
  placeholder?: string
  isMulti?: boolean
  isCreatable?: true
}

const SelectImpl = component$<Props>((props) => {
  const {
    value,
    options,
    onSelect,
    onCreate,
    placeholder = "Select",
    isMulti,
    isCreatable,
  } = props

  const {
    showMenuSig,
    actions: { hideMenu },
  } = useContext(MenuContext)
  const {
    inputSig,
    actions: { clearInput },
  } = useContext(InputContext)
  const {
    actions: { filter, populate, selectOption },
    filteredOptions,
  } = useContext(OptionsContext)

  const handleSelect = $(
    (
      option: OptionType,
      menuOptIdx: number,
      parentEmitFn: ParentEmitFnType
    ) => {
      inputSig.value = option.label

      if (isMulti) {
        clearInput()
        selectOption(option)
      }

      filter()
      hideMenu()

      parentEmitFn({
        newOpt: option,
        menuOptIdx,
      })
    }
  )

  useTask$(({ track }) => {
    // populates initial options
    track(() => options)
    populate(options)
  })

  useTask$(({ track }) => {
    track(() => value)
    if (isUndefined(value)) return
  })

  return (
    <div class={styles["qp-container"]}>
      <div class={styles["qp-wrapper"]}>
        {isMulti && (
          <div class="flex flex-wrap items-center gap-2 overflow-hidden">
            <Slot />
          </div>
        )}
        <>
          <Input placeholder={placeholder} />
        </>

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
