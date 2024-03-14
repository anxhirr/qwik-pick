import { component$, useContext } from "@builder.io/qwik"
import styles from "./styles.module.css"
import { MenuContext } from "../../store/menu"
import { InputContext } from "../../store/input"
import { OptionsContext } from "../../store/options"

export const Input = component$<{
  placeholder?: string
  openMenuOnFocus?: boolean
  isMulti: boolean
}>(({ placeholder, openMenuOnFocus = true, isMulti }) => {
  const {
    actions: { showMenu },
  } = useContext(MenuContext)
  const { inputSig, inputRef } = useContext(InputContext)
  const {
    actions: { filter, hoverOnExistingOrFirst },
  } = useContext(OptionsContext)

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={inputSig.value}
      class={styles.input}
      onInput$={(e) => {
        const value = (e.target as HTMLInputElement).value
        inputSig.value = value
        filter(isMulti)
      }}
      onFocus$={() => {
        if (openMenuOnFocus) {
          showMenu()
          hoverOnExistingOrFirst()
        }
      }}
    />
  )
})
