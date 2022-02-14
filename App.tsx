import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { User } from 'firebase/auth'

import Navigation from 'navigation'
import useCachedResources from 'hooks/useCachedResources'
import useColorScheme from 'hooks/useColorScheme'
import { UserProvider } from 'providers/UserProvider'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <UserProvider value={[user, setUser]}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </UserProvider>
      </SafeAreaProvider>
    )
  }
}
