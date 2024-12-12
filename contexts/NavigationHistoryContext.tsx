import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"
import { useNavigation } from "@react-navigation/native"

interface NavigationHistoryContextType {
  navigationHistory: string[]
  previousRoute: string | null
  lastRoute: string | null
  addToHistory: (route: string) => void
  removeLastRoute: () => void
  clearHistory: () => void
  setNavigationHistory: React.Dispatch<React.SetStateAction<string[]>>
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType>({
  navigationHistory: [],
  previousRoute: null,
  lastRoute: null,
  addToHistory: () => {},
  removeLastRoute: () => {},
  clearHistory: () => {},
  setNavigationHistory: () => {},
})

export const NavigationHistoryProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [navigationHistory, setNavigationHistory] = useState<string[]>([])
  const [lastRoute, setLastRoute] = useState<string | null>(null)
  const [previousRoute, setPreviousRoute] = useState<string | null>(null)

  const addToHistory = useCallback((route: string) => {
    setNavigationHistory((prev) => {
      if (prev[prev.length - 1] !== route) {
        setPreviousRoute(prev[prev.length - 1] || null)
        return [...prev, route]
      }
      return prev
    })
    setLastRoute(route)
  }, [])

  const removeLastRoute = useCallback(() => {
    setNavigationHistory((prev) => {
      const newHistory = [...prev]
      newHistory.pop()
      return newHistory
    })
  }, [])

  const clearHistory = useCallback(() => {
    setNavigationHistory([])
    setPreviousRoute(null)
    setLastRoute(null)
  }, [])

  return (
    <NavigationHistoryContext.Provider
      value={{
        navigationHistory,
        previousRoute,
        lastRoute,
        addToHistory,
        removeLastRoute,
        clearHistory,
        setNavigationHistory,
      }}>
      {children}
    </NavigationHistoryContext.Provider>
  )
}

export const useNavigationHistory = () => {
  const context = useContext(NavigationHistoryContext)
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      const state = e.data.state
      if (state && state.routes.length > 0) {
        const currentRoute = state.routes[state.index]

        context.addToHistory(currentRoute.name)
      }
    })

    return unsubscribe
  }, [navigation, context])

  return context
}
