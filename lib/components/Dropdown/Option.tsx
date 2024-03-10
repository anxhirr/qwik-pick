import { PropFunction, component$ } from "@builder.io/qwik"

export const Option = component$<{
  label: string
  onSelect: PropFunction<() => void>
  isSelected?: boolean
}>(({ label, onSelect, isSelected }) => {
  return (
    <li
      class="cursor-pointer rounded-md p-2 ps-4 hover:bg-accent hover:text-primary"
      aria-selected={isSelected}
      onClick$={onSelect}
    >
      {label}
    </li>
  )
})
