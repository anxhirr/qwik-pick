import { component$, useContext } from "@builder.io/qwik"
import styles from "./styles.module.css"
import { InputContext } from "../../store/input"
import { OptionsContext } from "../../store/options"
import { ClearIcon } from "../Icons/ClearIcon"

export const ClearButton = component$<{}>(() => {
  const {
    actions: { clearInput, focusInput },
  } = useContext(InputContext)
  const {
    actions: { resetFilteredList, resetSelectedList },
  } = useContext(OptionsContext)
  return (
    <div
      class={styles["qp-clear-button"]}
      onClick$={() =>
        clearInput()
          .then(resetFilteredList)
          .then(resetSelectedList)
          .then(focusInput)
      }
    >
      <ClearIcon />
    </div>
  )
})
