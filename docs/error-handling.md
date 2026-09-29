# Error Handling

This document outlines the error handling approach used in the Wavv application, covering both client-side errors and API error handling.

## Overview

The application employs a multi-layered approach to error handling:

1. **API Error Handling**: Centralized through Axios interceptors
2. **UI Error Feedback**: Through AlertDialog components
3. **Offline Detection**: Using NetInfo to detect and handle offline states
4. **Token Refresh**: Automatic handling of authentication errors

## API Error Handling

### Axios Interceptors

The application uses Axios interceptors in `service/index.ts` to handle API errors centrally:

```typescript
// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = await AsyncStorage.getItem("@Auth:refreshToken")
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken)
          error.response.config.headers["Authorization"] =
            `Bearer ${newAccessToken}`
          return axios(error.response.config)
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError)
        }
      }
    }
    return Promise.reject(error)
  },
)
```

Key features:
- Automatic token refresh on 401 (Unauthorized) errors
- Retrying the original request with the new token
- Propagating other errors to be handled by components

### Network Error Detection

The request interceptor checks for network connectivity before making API calls:

```typescript
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const netInfo = await NetInfo.fetch()
    if (!netInfo.isConnected) {
      AlertDialog.open()
      return Promise.reject(new Error("No internet connection"))
    }
    // ...other config setup
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)
```

## Offline Mode

### useOfflineHandler Hook

The application provides a custom hook (`hooks/useOfflineHandler.ts`) to handle offline operations:

```typescript
export const useOfflineHandler = () => {
  const [isOnline, setIsOnline] = useState(true)
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false)
    })
    return () => unsubscribe()
  }, [])

  const handleOfflineAction = useCallback(
    (callback: () => void) => {
      if (!isOnline) {
        AlertDialog.open({
          title: "No connection",
          description: "Make sure that you are connected to the internet and try again",
        })
        return
      }
      callback()
    },
    [isOnline]
  )

  return { isOnline, handleOfflineAction }
}
```

This hook:
- Monitors network connectivity status
- Provides a wrapper function for actions that require network connectivity
- Shows an alert dialog when attempting network actions while offline

## UI Error Feedback

### AlertDialog Component

The `AlertDialog` component (`components/AlertDialog.tsx`) is used throughout the application to display errors to users:

```typescript
AlertDialog.open({
  title: "Error Title",
  description: "Error description message",
  variant: "primary",
  onConfirm: () => { /* handle confirmation */ },
})
```

Features:
- Singleton pattern allowing global access
- Support for different variants (primary, confirm)
- Customizable actions

## React Query Error Handling

The application uses React Query for data fetching, which includes built-in error handling:

```typescript
const { data, error, isError } = useQuery({
  queryKey: ["key"],
  queryFn: async () => {
    // API call
  },
  onError: (error) => {
    // Handle specific error
    AlertDialog.open({
      title: "Error",
      description: error.message,
    })
  }
})
```

For mutations:

```typescript
const mutation = useMutation({
  mutationFn: (data) => api.post("/endpoint", data),
  onError: (error) => {
    console.error("Mutation error:", error)
    // Show error to user
  }
})
```

## Authentication Errors

Authentication errors are handled in the `AuthContext`:

```typescript
// Google Sign-In Error Handling
try {
  // Sign in logic
} catch (error) {
  setIsLoading(false)
  if (isErrorWithCode(error)) {
    switch (error.code) {
      case statusCodes.IN_PROGRESS:
        break
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        break
      default:
        console.error("Error:", error)
    }
  } else {
    console.error("Unexpected Error:", error)
  }
}
```

## Best Practices for Error Handling

When implementing new features:

1. **Use the AlertDialog component** for user-facing errors
2. **Wrap network actions** with `handleOfflineAction` from `useOfflineHandler`
3. **Implement onError callbacks** in React Query hooks
4. **Add error states** to your UI components
5. **Log errors** to console during development

## Common Error Scenarios

### Network Connectivity Issues

```typescript
const { handleOfflineAction } = useOfflineHandler()

const handleSaveProfile = () => {
  handleOfflineAction(() => {
    // Proceed with save operation
    saveProfileMutation.mutate(formData)
  })
}
```

### API Validation Errors

```typescript
const mutation = useMutation({
  mutationFn: (data) => api.post("/user", data),
  onError: (error: AxiosError) => {
    if (error.response?.status === 422) {
      // Validation error
      AlertDialog.open({
        title: "Validation Error",
        description: "Please check your input and try again."
      })
    } else {
      // Generic error
      AlertDialog.open({
        title: "Error",
        description: "Something went wrong. Please try again."
      })
    }
  }
})
```

### Authentication Errors

```typescript
// In AuthContext
const refreshAccessToken = async () => {
  try {
    // Refresh token logic
  } catch (error) {
    // Token refresh failed, force logout
    await signOut()
    AlertDialog.open({
      title: "Session Expired",
      description: "Your session has expired. Please sign in again."
    })
  }
}
``` 