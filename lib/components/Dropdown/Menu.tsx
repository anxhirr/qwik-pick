import { $, component$, useContext } from "@builder.io/qwik"
import { OptionType, SelectHandlerType } from "../../types"
import { Option } from "."
import { MenuContext } from "../../store/menu"
import { InputContext } from "../../store/input"
import styles from "./styles.module.css"
import { OptionsContext } from "../../store/options"
import { checkIsSelected } from "../../utils"

export const Menu = component$<{
  options: OptionType[]
  onSelect: SelectHandlerType
  onCreate?: SelectHandlerType
  isCreatable?: boolean
}>(({ options, onSelect, isCreatable, onCreate }) => {
  const noResultsFound = !options.length

  const { menuRef } = useContext(MenuContext)
  const { inputSig } = useContext(InputContext)
  const { hoveredOptionIndex, selectedOptions } = useContext(OptionsContext)

  return (
    <div ref={menuRef} class={styles["qp-menu"]}>
      <ul>
        {options.map((opt, i) => {
          return (
            <Option
              key={opt.value}
              label={opt.label}
              onSelect={$(() => onSelect(opt, i))}
              isSelected={checkIsSelected(selectedOptions.value, opt)}
              isHovered={hoveredOptionIndex.value === i}
            />
          )
        })}

        {noResultsFound && (
          <>
            {isCreatable ? (
              <Option
                label={
                  inputSig.value
                    ? `Create "${inputSig.value}"`
                    : "No more results, type to create new"
                }
                onSelect={$(() => {
                  if (!inputSig.value) return // do nothing for the moment
                  const flyOpt = {
                    label: inputSig.value,
                    value: inputSig.value,
                  }
                  onCreate?.(flyOpt, 0)
                })}
              />
            ) : (
              <li class="p-2 ps-4 text-sm text-base-content">
                No results found
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  )
})
