import { ImageSourcePropType, TextStyle } from "react-native"

export type TypographySizeVariant = "lg" | "base" | "sm"
export type FontSizeVariant = TypographySizeVariant
export type LineHeightVariant = TypographySizeVariant
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
  fontSize: Record<FontSizeVariant, TextStyle["fontSize"]>
  lineHeight: Record<LineHeightVariant, TextStyle["lineHeight"]>
  fontWeight: Record<FontWeightVariant, TextStyle["fontWeight"]>
  fontStyle: Record<fontStyleVariant, fontStyleVariant>
  fontFamily: Record<
    FontFamilyVariant,
    Partial<Record<FontWeightVariant, { normal: string; italic: string }>>
  >
}
export interface User {
  id: string
  username: string
  name: string
  time: string
  activity: string
  selected?: boolean
  imageUrl?: ImageSourcePropType
}
export type AccountCreationStep = 1 | 2
