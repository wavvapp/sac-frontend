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
  names: string
  time?: string
  email: string
  activity?: string
  selected?: boolean
  profilePictureUrl?: ImageSourcePropType
  isFriend?: boolean
}
export interface Friend {
  id: string
  friendId: string
  username: string
  user: User
  name: string
  time?: string
  activity?: string
  selected?: boolean
  profilePictureUrl?: ImageSourcePropType
  isFriend?: boolean
}

export interface Signal {
  id?: string
  status?: string
  when: string
  status_message: string
  createdAt?: string
  updatedAt?: string
  friends: string[]
}

export type BackendUser = {
  id: string
  names: string
  email: string
  phoneNumber: string | null
  location: string | null
  bio: string | null
  profilePictureUrl: ImageSourcePropType
  username: string
  emailVerified: boolean
  isActive: boolean
  lastLogin: string | null
  provider: string
  profileStatus: boolean
  createdAt: string
  updatedAt: string
}
export type FriendSignal = {
  id: string
  username: string
  email: string
  profilePictureUrl: string
  names: string
  signal: Signal
}
export type AccountCreationStep = 1 | 2
