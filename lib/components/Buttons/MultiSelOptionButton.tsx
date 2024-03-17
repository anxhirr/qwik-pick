import { QRL, component$ } from "@builder.io/qwik"
import styles from "./styles.module.css"
import { ClearIcon } from "../Icons/ClearIcon"

export const MultiSelOptionButton = component$<{
  label: string
  onRemove: QRL<() => void>
}>(({ label, onRemove }) => {
  return (
    <button onClick$={onRemove} class={styles["qp-button"]}>
      <span>{label}</span>
      <ClearIcon />
    </button>
  )
})
