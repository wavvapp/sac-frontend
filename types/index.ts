import { ImageSourcePropType } from "react-native"

export type SizeVariant = "2xl" | "xl" | "lg" | "base" | "sm" | "xs"
export type FontWeightVariant =
  | "black"
  | "bold"
  | "semibold"
  | "medium"
  | "normal"
  | "light"
  | "extralight"
  | "thin"
export type ButtonVariant = "secondary" | "primary"
export type FontFamilyVariant = "suisse" | "marfa" | "writer-mono"
export type fontStyleVariant = "normal" | "italic"

export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  time: string
  activity: string
  selected?: boolean
  imageUrl?: ImageSourcePropType
}
