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
  | "danger"
export type FontFamilyVariant = "suisse" | "writer-monos" | "writer-monov"
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
  inviteCode: string
}
export interface Friend {
  id: string
  friendId: string
  username: string
  user: User
  names: string
  email: string
  time?: string
  activity?: string
  selected?: boolean
  profilePictureUrl?: ImageSourcePropType
  isFriend?: boolean
  inviteCode: string
  hasNotificationEnabled?: boolean
  signal?: Signal
}

export interface Signal {
  id?: string
  hasEnded?: boolean
  when: string
  status_message: string
  createdAt?: string
  updatedAt?: string
  friends: Friend[]
  friendIds: string[]
  status?: string
  groups: Group[]
}

export type FriendSignal = {
  id: string
  username: string
  email: string
  profilePictureUrl: string
  names: string
  signal: Signal
}
export type AccountCreationStep = 1 | 2 | 3

export enum Provider {
  GOOGLE = "google",
  APPLE = "apple",
}

export type StaticPageType = "privacy" | "terms"

export type AlertDialogVariant = "primary" | "confirm"
export type SettingOption = {
  title: string
  description: string
  icon: React.JSX.Element
  onPress: () => void | Promise<void>
  titleStyle?: TextStyle
}

export type Group = {
  id: string
  name: string
  friends: {
    id: string
    names: string
    username: string
  }[]
}

export enum AudienceOptions {
  GROUPS = "groups",
  FRIENDS = "friends",
}
