import { ImageSourcePropType, TextStyle } from "react-native"
import { theme } from "@/theme"

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

export type Theme = typeof theme

export type User = {
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
export type Friend = {
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

export type SignalReplyStatus = {
  hasAccepted: boolean
  hasReplied: boolean
}

export type Signal = {
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
  startsAt: Date
  endsAt: Date
  counts: {
    total: number
    accepted: number
    rejected: number
  }
} & SignalReplyStatus

export type FriendSignal = {
  id: string
  username: string
  email: string
  profilePictureUrl: string
  names: string
  signal: Signal
}
export type AccountCreationStep = 1 | 2

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

export type RootStackParamList = {
  EntryScreen: undefined
  Home: undefined
  EditSignal: { isNewSignal?: boolean }
  SignUp: undefined
  Settings: undefined
  Signaling: undefined
  CreateCredentials: undefined
  Search: undefined
  CreateGroup: undefined
  NotificationPreferences: undefined
  StaticContentScreen: { pageSlug: StaticPageType }
  Groups: undefined
  EditGroup: { groupId: string; name: string; friendIds: string[] }
}
