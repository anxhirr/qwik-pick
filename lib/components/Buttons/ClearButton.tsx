import { component$, useContext } from "@builder.io/qwik"
import styles from "./styles.module.css"
import { InputContext } from "../../store/input"
import { OptionsContext } from "../../store/options"

export const ClearButton = component$<{}>(() => {
  const {
    actions: { clearInput, focusInput },
  } = useContext(InputContext)
  const {
    actions: { filter },
  } = useContext(OptionsContext)
  return (
    <div
      class={styles["qp-clear-button"]}
      onClick$={() => clearInput().then(focusInput).then(filter)}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="-2 -2 50 50"
        focusable="false"
        aria-hidden="true"
        role="presentation"
      >
        <path
          fill="currentColor"
          d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124
  l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"
        />
      </svg>
    </div>
  )
})
