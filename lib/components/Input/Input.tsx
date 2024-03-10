import { component$, useContext } from "@builder.io/qwik"
import styles from "./styles.module.css"
import { MenuContext } from "../../store/menu"
import { InputContext } from "../../store/input"

export const Input = component$<{
  placeholder?: string
  openMenuOnFocus?: boolean
}>(({ placeholder, openMenuOnFocus = true }) => {
  const {
    actions: { showMenu },
  } = useContext(MenuContext)
  const { inputSig, inputRef } = useContext(InputContext)

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={inputSig.value}
      class={styles.input}
      onInput$={(e) => (inputSig.value = (e.target as HTMLInputElement).value)}
      onFocus$={() => openMenuOnFocus && showMenu()}
    />
  )
})
