import { PropFunction } from "@builder.io/qwik"

export type OptionType = {
  value: string
  label: string
}
export type SelectHandlerType = PropFunction<
  (option: Option, menuOptIdx: number) => void
>

export type ParentEmitFnType = (args: {
  newOpt: Option
  menuOptIdx: number
}) => void

export type OptionLabelKey<Option> = Option extends string
  ? never
  : keyof Option
