import { $, component$ } from "@builder.io/qwik"
import { Select } from "../lib/Select"

export const App = component$(() => {
  const handleOnSelect = $(() => {
    console.log("onSelect")
  })

  const handleOnChange = $(() => {
    console.log("onChange")
  })

  return (
    <>
      <Select
        onSelect={$(() => {
          handleOnSelect()
        })}
        options={[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
        ]}
        onChange={$(() => {
          handleOnChange()
        })}
        isMulti
      />
    </>
  )
})
