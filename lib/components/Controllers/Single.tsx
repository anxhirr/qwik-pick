import { PropFunction, Signal, component$ } from "@builder.io/qwik"

import { OptionLabelKey } from "../../types"
import { RemoveButton } from "../Buttons"
import { LoadingIndicator } from "../Loading"
import { Input } from "../Input"

interface SingleSelectControlProps<Option> {
  ref: Signal<Element | undefined>
  placeholder: string
  input: Signal<string>
  value?: Option
  loading: boolean
  disabled?: boolean
  autofocus?: boolean
  clearable: boolean
  onClear$?: PropFunction<() => void>
  optionLabelKey?: OptionLabelKey<Option>
}

const SingleSelectControl = component$(
  <Option,>(props: SingleSelectControlProps<Option>) => {
    const selectedOption = props.value
    const hasValue = !!selectedOption
    const isBlankTextInput = props.input.value === ""
    const shouldShowLoading = props.loading
    const shouldShowValue = hasValue && isBlankTextInput
    const shouldShowClearBtn =
      props.clearable && shouldShowValue && !shouldShowLoading

    return (
      <div class="qs-single-control">
        <Input placeholder={props.placeholder} />

        {shouldShowClearBtn && <RemoveButton onRemove={props.onClear$!} />}
        {shouldShowLoading && <LoadingIndicator />}
      </div>
    )
  }
)

export default SingleSelectControl
