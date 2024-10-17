import { ImageSourcePropType, TextStyle } from "react-native"

export type SizeVariant = "lg" | "base" | "sm"
export type FontWeightVariant =
  | "black"
  | "bold"
  | "semibold"
  | "medium"
  | "normal"
  | "light"
  | "extralight"
  | "thin"
export type ButtonVariant =
  | "secondary"
  | "primary"
  | "outline"
  | "ghost"
  | "default"
  | "destructive"
export type FontFamilyVariant = "suisse" | "marfa" | "writer-mono"
export type fontStyleVariant = "normal" | "italic"
export type BadgeVariant = "default" | "outline" | "primary"
export type InputVariant = "primary" | "secondary" | "ghost"

export type Theme = {
  colors: Record<string, string>
  size: Record<SizeVariant, TextStyle>
  fontWeight: Record<FontWeightVariant, TextStyle>
  fontStyle: Record<fontStyleVariant, TextStyle>
  fontFamily: Record<
    FontFamilyVariant,
    Partial<Record<FontWeightVariant, { normal: string; italic: string }>>
  >
}
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
