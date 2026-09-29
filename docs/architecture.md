# Wavv App Architecture Documentation

## High-level Architecture

The Wavv App is a React Native mobile application built with Expo. It follows a component-based architecture with a clear separation of concerns. The application uses React Context for state management, React Query for data fetching, and React Navigation for routing between screens.

### Core Architectural Components

#### 1. Provider Layer
The application's state is managed through a hierarchy of providers wrapping the main app component (`App.tsx`):

- **QueryClient Provider** (`@tanstack/react-query`): Manages all API data fetching and caching
- **Auth Provider** (`contexts/AuthContext.tsx`): Handles user authentication state
- **Notification Provider** (`contexts/NotificationContext.tsx`): Manages push notifications
- **Safe Area Provider** (React Native): Handles safe areas on different devices
- **Status Provider** (`contexts/StatusContext.tsx`): Manages user status ("wavv") state

#### 2. Navigation Layer
The application uses React Navigation (`navigation/index.tsx`) with conditional rendering based on authentication state:

- **Authenticated Stack**: Shown when user is logged in
- **Unauthenticated Stack**: Shown when user is not logged in

#### 3. API Integration Layer
Centralized API handling through Axios instance with interceptors (`service/index.ts`):
- Authentication token management
- Error handling
- Offline detection

#### 4. Features Implementation
Core features are implemented through dedicated queries and components:
- **Authentication**: Using third-party providers (Google, Apple)
- **Signals/Wavvs**: Managed through SignalContext and signal APIs
- **Friends & Groups**: For targeting signals to specific users
- **Points System**: Gamification feature tracked through API

## Component Architecture

### State Management
The application uses React Context API for global state management:

1. **AuthContext** (`contexts/AuthContext.tsx`): 
   - Handles user login/logout through Google/Apple authentication
   - Stores user data in AsyncStorage for persistence
   - Handles token refresh through API interceptors
   - Determines if user is authenticated for routing decisions

2. **StatusContext** (`contexts/StatusContext.tsx`):
   - Stores current user status with a SharedValue for animation support
   - Provides functions to update status through API calls
   - Tracks temporal status settings (time slots, dates, targets)
   - Connects to StatusProvider in the main app flow

3. **NotificationContext** (`contexts/NotificationContext.tsx`):
   - Handles expo-notifications implementation
   - Registers device tokens with backend
   - Manages user notification preferences

### Data Fetching
The application uses React Query hooks (in the `queries/` directory) for data fetching and caching:

1. **Query Hooks**:
   - `useFriends()` (`queries/friends.ts`): Fetches and caches user's friends list
   - `useMySignal()` (`queries/signal.ts`): Fetches user's current active signal
   - `useSaveStatus()` (`queries/signal.ts`): Updates user's signal with optimistic updates
   - `useTurnOffSignal()` (`queries/signal.ts`): Deactivates user's current signal
   - `useFetchPoints()` (`queries/points.ts`): Fetches user's points balance

2. **API Integration** (`service/index.ts`):
   - Centralized Axios instance with interceptors
   - Automatic token refresh on 401 errors
   - Network detection through NetInfo
   - Error handling with UI feedback

### Navigation Structure

The navigation is defined in `navigation/index.tsx` and conditionally renders different stacks based on authentication state:

1. **Unauthenticated Stack**:
   - `EntryScreen` (`screens/Authentication/index.tsx`): Login options screen
   - `SignUp` (`screens/Authentication/SignUp/index.tsx`): Sign up process
   - `CreateCredentials` (`screens/Authentication/SignUp/CreateCredentials.tsx`): Username creation

2. **Authenticated Stack**:
   - `Home` (`screens/Home/index.tsx`): Main screen showing user status and friends
   - `EditSignal` (`screens/EditSignal/index.tsx`): Create/edit status
   - `Settings` (`screens/Settings/index.tsx`): User settings
   - `Search` (`screens/Search/index.tsx`): Find and add friends
   - `Groups` (`screens/Groups/index.tsx`): Manage friend groups
   - `NotificationPreferences` (`screens/NotificationPreferences/index.tsx`): Notification settings

## Key Features Implementation

### Authentication (`contexts/AuthContext.tsx`, `screens/Authentication/`)
- Google Sign-In integration using `@react-native-google-signin/google-signin`
- Apple Sign-In integration using `expo-apple-authentication`
- Token-based authentication with refresh capability
- Offline detection and handling through `NetInfo`
- AsyncStorage for persisting login state

### Signals/Wavvs (`screens/EditSignal/`, `contexts/StatusContext.tsx`, `queries/signal.ts`)
- Create and manage user statuses through StatusContext and API
- Set time slots (NOW, MORNING, LUNCH, etc.) using DatePicker component
- Target specific friends or groups using Audience component
- View friends' signals on home screen through Signaling component

### Groups (`screens/Groups/`, `queries/groups.ts`)
- Create and manage friend groups with persist to API
- Target signals to specific groups through Audience component
- Edit group members with UI feedback and optimistic updates

### Points System (`queries/points.ts`, displayed on Home screen)
- Track user points through API integration
- Display points on home screen through Badge component
- Link to external points system via WebBrowser

## Technical Implementation Details

### UI Components (`components/` directory)
The app uses a custom component library built on React Native primitives:
- Custom Text components with typography system (`components/ui/CustomText.tsx`)
- Custom Button components (`components/ui/Button.tsx`)
- Card components for various content types (`components/cards/`)
- Bottom sheet drawers for modal interactions (`components/BottomDrawer.tsx`)

### Styling (`theme.ts`)
- Theme-based styling with consistent colors and typography
- StyleSheet API for component styling
- Responsive layouts based on device dimensions

### Animations
- React Native Reanimated for fluid animations
- Shared values (like `isOn` in StatusContext) for cross-component animations
- Custom animation components (Noise, Perlin noise effects in `components/PerlinNoise/`)

## File Structure to Architecture Mapping

- **App.tsx**: Main application entry point with provider wrapping
- **navigation/**: Navigation configuration connecting all screens
- **contexts/**: Global state management through React Context
- **screens/**: UI screens representing main application views
- **components/**: Reusable UI components utilized by screens
- **queries/**: Data fetching logic using React Query
- **service/**: API integration through Axios
- **types/**: TypeScript definitions for app data models
- **utils/**: Helper functions and utilities
- **hooks/**: Custom React hooks for shared logic
- **theme.ts**: Global styling system

## Data Flow Examples

1. **User Authentication Flow**:
   - User taps Google/Apple sign-in button in EntryScreen
   - AuthContext calls appropriate sign-in method
   - API call is made with received token
   - On success, user data is stored in AsyncStorage
   - isAuthenticated state changes, triggering navigation to Home screen
   - Prefetch queries run to populate initial data

2. **Creating a Wavv (Signal)**:
   - User navigates to EditSignal screen
   - User sets activity, time slot, and audience
   - On save, useSaveStatus mutation is called
   - Optimistic update shows immediate feedback
   - API request updates backend
   - On success, React Query invalidates and refetches relevant queries
   - Home screen updates to show new status 