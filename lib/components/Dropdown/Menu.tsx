import { $, component$, useContext } from "@builder.io/qwik"
import { OptionType, SelectHandlerType } from "../../types"
import { Option } from "."
import { MenuContext } from "../../store/menu"
import { InputContext } from "../../store/input"

export const Menu = component$<{
  options: OptionType[]
  onSelect: SelectHandlerType
  onCreate?: SelectHandlerType
  isCreatable?: boolean
}>(({ options, onSelect, isCreatable, onCreate }) => {
  const noResultsFound = !options.length

  const { menuRef } = useContext(MenuContext)
  const { inputSig } = useContext(InputContext)

  return (
    <div ref={menuRef} class="rounded-lg bg-secondary">
      <ul>
        {options.map((opt, i) => (
          <Option
            key={opt.value}
            label={opt.label}
            onSelect={$(() => onSelect(opt, i))}
          />
        ))}

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
