# API Reference

This document provides an overview of the API endpoints used by the Wavv application and how to interact with them.

## API Configuration

The application configures a central Axios instance in `service/index.ts`:

```typescript
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-api-version": "2",
  },
})
```

All API requests include:
- Authentication token (when available)
- Timezone information
- API version header

## Authentication Endpoints

### Sign In

Used for authentication with third-party providers (Google, Apple).

```typescript
// POST /auth/signin
const handleApiSignIn = async (payload: {
  token: string,
  provider: Provider,
  platform: string,
  names?: string,
  email?: string
}) => {
  return await api.post('/auth/signin', payload);
}
```

Parameters:
- `token`: Token from authentication provider
- `provider`: "google" or "apple"
- `platform`: "web" or "android"
- `names`: Optional user name (for Apple sign-in)
- `email`: Optional user email (for Apple sign-in)

Responses:
- `200`: Successful sign-in, returns user data and tokens
- `202`: New user, needs to create username

### Refresh Token

Refreshes the authentication token.

```typescript
// POST /auth/refresh-token
const refreshAccessToken = async (refreshToken: string) => {
  const url = `${process.env.API_BASE_URL}/auth/refresh-token`
  const body = { refresh_token: refreshToken }
  const { data } = await axios.post(url, body)
  return data.access_token
}
```

## User Endpoints

### Get User Profile

Retrieves the current user's profile information.

```typescript
// GET /user
const { data: user } = await api.get('/user')
```

### Update User Profile

Updates user profile information.

```typescript
// PUT /user
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: { names: string }) => {
      return api.put("/user", data)
    }
  })
}
```

## Signal Endpoints

### Get My Signal

Retrieves the current user's active signal.

```typescript
// GET /my-signal
export const useMySignal = () => {
  return useQuery<Signal, Error>({
    queryKey: ["fetch-my-signal"],
    queryFn: async () => {
      const { data } = await api.get("/my-signal")
      return data
    },
  })
}
```

### Update Signal

Updates or creates a signal for the current user.

```typescript
// PUT /my-signal
export const useSaveStatus = (args: UseSaveSatusArgs) => {
  const { data: temporaryStatus, ...rest } = args
  return useMutation({
    mutationFn: () => {
      return api.put("/my-signal", {
        friends: temporaryStatus.friendIds,
        status_message: temporaryStatus.activity,
        when: temporaryStatus.timeSlot,
        groups: temporaryStatus.groups,
        startsAt: temporaryStatus?.startsAt,
        endsAt: temporaryStatus?.endsAt,
      })
    },
    ...rest,
  })
}
```

### Turn Off Signal

Deactivates the user's current signal.

```typescript
// POST /my-signal/turn-off
export const useTurnOffSignal = (args: MutationOptions) => {
  return useMutation({
    mutationKey: ["toggle-signal-change"],
    mutationFn: () => api.post("/my-signal/turn-off"),
    networkMode: "online",
    ...args,
  })
}
```

## Friend Endpoints

### Get Friends List

Retrieves the user's friends list.

```typescript
// GET /friends
export const useFriends = () => {
  return useQuery<Friend[], Error>({
    queryKey: ["friends"],
    queryFn: async () => {
      const { data } = await api.get('/friends')
      return data
    },
    staleTime: 10000,
  })
}
```

### Get Friend Signals

Retrieves signals from the user's friends.

```typescript
// GET /friend-signals
export const useFriendSignals = () => {
  return useQuery<FriendSignal[], Error>({
    queryKey: ["friend-signals"],
    queryFn: async () => {
      const { data } = await api.get('/friend-signals')
      return data
    },
    staleTime: 10000,
  })
}
```

### Add Friend

Adds a friend using their invite code.

```typescript
// POST /friends
export const useAddFriend = () => {
  return useMutation({
    mutationFn: (code: string) => {
      return api.post("/friends", { code })
    },
  })
}
```

### Enable Friend Notifications

Enables or disables notifications for a specific friend.

```typescript
// PUT /friends/:id/notifications
export const useToggleFriendNotifications = () => {
  return useMutation({
    mutationFn: (params: { friendId: string; enabled: boolean }) => {
      return api.put(`/friends/${params.friendId}/notifications`, {
        enabled: params.enabled,
      })
    },
  })
}
```

## Group Endpoints

### Get Groups

Retrieves the user's groups.

```typescript
// GET /groups
export const useGroups = () => {
  return useQuery<Group[], Error>({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await api.get("/groups")
      return data
    },
  })
}
```

### Create Group

Creates a new group with the specified name and members.

```typescript
// POST /groups
export const useCreateGroup = () => {
  return useMutation({
    mutationFn: (params: { name: string; friendIds: string[] }) => {
      return api.post("/groups", params)
    },
  })
}
```

### Update Group

Updates an existing group.

```typescript
// PUT /groups/:id
export const useUpdateGroup = () => {
  return useMutation({
    mutationFn: (params: {
      groupId: string;
      name: string;
      friendIds: string[];
    }) => {
      return api.put(`/groups/${params.groupId}`, {
        name: params.name,
        friendIds: params.friendIds,
      })
    },
  })
}
```

### Delete Group

Deletes a group.

```typescript
// DELETE /groups/:id
export const useDeleteGroup = () => {
  return useMutation({
    mutationFn: (groupId: string) => {
      return api.delete(`/groups/${groupId}`)
    },
  })
}
```

## Points Endpoints

### Get Points

Retrieves the user's points.

```typescript
// GET /points
export const useFetchPoints = () => {
  return useQuery({
    queryKey: ["points"],
    queryFn: async () => {
      const { data } = await api.get('/points')
      return data
    }
  })
}
```

## Notifications Endpoints

### Register Device

Registers the device for push notifications.

```typescript
// POST /notifications/register
export const useRegisterNotifications = () => {
  return useMutation({
    mutationFn: (token: string) => {
      return api.post('/notifications/register', { token })
    },
  })
}
```

## Best Practices for API Interaction

1. **Use React Query Hooks**: Always use the predefined query hooks for data fetching
2. **Handle Errors**: Implement proper error handling for all API calls
3. **Optimistic Updates**: Use optimistic updates for better UX, especially for mutations
4. **Authentication**: Ensure all endpoints that require authentication include the token
5. **Prefetching**: Use prefetching for common queries to improve performance

## Example: Complete API Interaction Flow

Here's an example of the complete flow for creating a new signal:

```typescript
// In a component
const { temporaryStatus } = useStatus()
const queryClient = useQueryClient()

const saveStatus = useSaveStatus({
  data: temporaryStatus,
  onMutate: async () => {
    // 1. Cancel any outgoing refetches
    await queryClient.cancelQueries({ queryKey: ["fetch-my-signal"] })
    
    // 2. Get current data
    const allFriends = queryClient.getQueryData<Friend[]>(["friends"])
    const selectedFriends = allFriends?.filter((friend) =>
      temporaryStatus.friendIds.includes(friend.id),
    )
    
    // 3. Create optimistic update
    const optimisticStatus: Signal = {
      when: temporaryStatus.timeSlot,
      status_message: temporaryStatus.activity,
      friends: selectedFriends || [],
      friendIds: temporaryStatus.friendIds,
      groups: temporaryStatus.groups,
      status: "active",
      startsAt: temporaryStatus?.startsAt,
      endsAt: temporaryStatus?.endsAt,
    }
    
    // 4. Apply optimistic update
    queryClient.setQueryData(["fetch-my-signal"], optimisticStatus)
    
    // 5. Navigate back
    navigation.navigate("Home")
  },
  onError: (error) => {
    console.log(error.message)
  },
  onSettled: async () => {
    // 6. Refetch to ensure data consistency
    await queryClient.refetchQueries({ queryKey: ["fetch-my-signal"] })
  },
})

// When user saves the signal
const handleSaveStatus = () => {
  handleOfflineAction(() => saveStatus.mutate())
}
``` 