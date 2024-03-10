import { PropFunction, component$ } from "@builder.io/qwik"

export const Option = component$<{
  label: string
  onSelect: PropFunction<() => void>
}>(({ label, onSelect }) => {
  return (
    <li
      class="cursor-pointer rounded-md p-2 ps-4 hover:bg-accent hover:text-primary"
      onClick$={onSelect}
    >
      {label}
    </li>
  )
})
