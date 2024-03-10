import { OptionType } from "../types"

export const isString = (value: unknown): value is string => {
  return typeof value === "string"
}

export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined
}

const filterByInput = (options: OptionType[], value: string) => {
  return options.filter((item) =>
    item.label.toLowerCase().includes(value.toLowerCase())
  )
}

const filterByOptions = (
  options: OptionType[],
  selectedOptions: OptionType[]
) => {
  const values = selectedOptions.map((opt) => opt.value)
  return options.filter((opt) => !values.includes(opt.value))
}

export const getFilteredOptions = (
  options: OptionType[],
  selectedOptions: OptionType[],
  input: string
) => {
  const inputFiltered = filterByInput(options, input)
  const finalOptions = filterByOptions(inputFiltered, selectedOptions)
  return finalOptions
}
