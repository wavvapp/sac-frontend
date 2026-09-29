# Data Models

This document outlines the key data structures used throughout the Wavv application. Understanding these models is essential for working with the application's state management and API interactions.

## Core Data Types

The application's core data types are defined in `types/index.ts`.

### User

The `User` interface represents an application user:

```typescript
export interface User {
  id: string;
  username: string;
  names: string;
  time?: string;
  email: string;
  activity?: string;
  selected?: boolean;
  profilePictureUrl?: ImageSourcePropType;
  isFriend?: boolean;
  inviteCode: string;
}
```

Key properties:
- `id`: Unique identifier for the user
- `username`: User's username, used for display and search
- `names`: User's full name
- `email`: User's email address
- `inviteCode`: Code that can be shared to invite friends

### Friend

The `Friend` interface extends user information with friendship-specific data:

```typescript
export interface Friend {
  id: string;
  friendId: string;
  username: string;
  user: User;
  names: string;
  email: string;
  time?: string;
  activity?: string;
  selected?: boolean;
  profilePictureUrl?: ImageSourcePropType;
  isFriend?: boolean;
  inviteCode: string;
  hasNotificationEnabled?: boolean;
  signal?: Signal;
}
```

Key additional properties:
- `friendId`: ID referencing the friendship relationship
- `hasNotificationEnabled`: Whether notifications are enabled for this friend
- `signal`: The friend's current signal/status

### Signal (Wavv)

The `Signal` interface represents a user's status or "wavv":

```typescript
export interface Signal {
  id?: string;
  hasEnded?: boolean;
  when: string;
  status_message: string;
  createdAt?: string;
  updatedAt?: string;
  friends: Friend[];
  friendIds: string[];
  status?: string;
  groups: Group[];
  startsAt: Date;
  endsAt: Date;
}
```

Key properties:
- `when`: Time slot descriptor (e.g., "NOW", "MORNING", "EVENING")
- `status_message`: The actual activity or status message
- `friends`: List of friends this signal is visible to
- `friendIds`: Array of friend IDs this signal is targeted to
- `groups`: List of groups this signal is visible to
- `startsAt` & `endsAt`: Time range for the signal's validity

### Group

The `Group` interface represents a collection of friends:

```typescript
export type Group = {
  id: string;
  name: string;
  friends: {
    id: string;
    names: string;
    username: string;
  }[];
}
```

Key properties:
- `id`: Unique identifier for the group
- `name`: Display name for the group
- `friends`: Simplified list of friends in the group

## Enum Types

### Provider

Authentication provider types:

```typescript
export enum Provider {
  GOOGLE = "google",
  APPLE = "apple",
}
```

### AudienceOptions

Options for selecting signal audience:

```typescript
export enum AudienceOptions {
  GROUPS = "groups",
  FRIENDS = "friends",
}
```

## State Types

### TemporaryStatusType

Type used in StatusContext to manage signal editing:

```typescript
export type TemporaryStatusType = {
  timeSlot: string;
  startsAt: Date;
  endsAt: Date;
  activity: string;
  friendIds: string[];
  groups: Group[];
}
```

## UI Types

The application uses several types for UI configuration:

```typescript
export type TypographySizeVariant = "lg" | "base" | "sm";
export type FontSizeVariant = TypographySizeVariant;
export type LineHeightVariant = TypographySizeVariant;
export type FontWeightVariant = "black" | "bold" | "semibold" | "medium" | "normal" | "light" | "extralight" | "thin";
export type ButtonVariant = "secondary" | "primary" | "outline" | "ghost" | "default" | "destructive" | "danger";
export type FontFamilyVariant = "suisse" | "writer-monos" | "writer-monov";
export type fontStyleVariant = "normal" | "italic";
export type BadgeVariant = "default" | "outline" | "primary";
export type InputVariant = "primary" | "secondary" | "ghost";
export type AlertDialogVariant = "primary" | "confirm";
```

## Data Flow and Relationships

### User and Friends

- A user can have multiple friends (bidirectional relationship)
- Friends are retrieved through the `useFriends()` query hook

### Signals and Audience

- A signal can target individual friends, groups, or both
- The audience selection is managed through the `AudienceOptions` enum
- When creating a signal, users select which friends/groups can see it

### Groups and Friends

- A group contains multiple friends
- Friends can belong to multiple groups
- Groups are managed through dedicated screens and API endpoints

## Data Persistence

The application uses several mechanisms for data persistence:

1. **API Data**: Most data is persisted server-side through API calls
2. **Authentication Tokens**: Stored in AsyncStorage for session persistence
3. **User Data**: Basic user info stored in AsyncStorage for quick access
4. **React Query**: Provides client-side caching of API responses

See the [API Reference](api-reference.md) for more details on how data is synchronized with the server. 