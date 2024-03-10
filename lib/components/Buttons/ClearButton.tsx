import { QRL, component$ } from "@builder.io/qwik"
import styles from "./styles.module.css"

export const ClearButton = component$<{
  onClear: QRL<(e: Event) => void>
}>((props) => {
  return (
    <div class={styles["qp-clear-button"]} onClick$={props.onClear}>
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
