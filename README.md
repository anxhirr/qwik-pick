# Qwik-Pick

Qwik-Pick is a replacement for the native `select` element, with a focus on performance and accessibility.

## Usage

```bash
$ npm i qwik-pick # or pnpm install or yarn install
```

## Features

- **Performance**: Virtualization to render only the visible options.
- **Accessibility**: Keyboard navigation, screen readers, and more.
- **Customization**: Custom styles, custom options, and more.

## Example

```ts
import { component$, useSignal } from "@builder.io/qwik"
import { Select, OptionType } from "qwik-pick"

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
]

export const App = component$(() => {
  const [selectedOption, setSelectedOption] = useSignal<OptionType>()

  return (
    <Select
      options={options}
      defaultOption={selectedOption}
      onChange={setSelectedOption}
    />
  )
})
```

## Warning

Currently, the library is in the early stages of development, so it's not fully feature rich.
Upcoming versions will include multi-select, async options, custom styles, portal, debounce etc.
