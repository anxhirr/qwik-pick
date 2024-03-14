import { QRL, Signal, createContextId } from "@builder.io/qwik"
import { OptionType } from "../types"

export const OptionsContext = createContextId<{
  possibleOptions: Signal<OptionType[]>
  filteredOptions: Signal<OptionType[]>
  selectedOptions: Signal<OptionType[]>
  hoveredOptionIndex: Signal<number>
  actions: {
    resetFilteredList: QRL<() => void>
    resetSelectedList: QRL<() => void>
    filter: QRL<(isMulti: boolean) => void>
    populate: QRL<(options: OptionType[]) => void>

    selectOption: QRL<(option: OptionType) => void>
    hoverOnExistingOrFirst: QRL<() => void>
  }
}>("OptionsContext")
