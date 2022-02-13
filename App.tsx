import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { initializeApp } from 'firebase/app'
import { User } from 'firebase/auth'

import Navigation from 'navigation'
import useCachedResources from 'hooks/useCachedResources'
import useColorScheme from 'hooks/useColorScheme'
import { UserProvider } from 'providers/UserProvider'

// Initialize Firebase.
initializeApp({
  apiKey: 'AIzaSyC8Q8S-aeQi5AvvQiojAeeNRk-j4H5nEMk',
  authDomain: 'tcd-paint-yourself.firebaseapp.com',
  projectId: 'tcd-paint-yourself',
  storageBucket: 'tcd-paint-yourself.appspot.com',
  messagingSenderId: '486967078951',
  appId: '1:486967078951:web:346f738f1267ea41cf1e02',
  measurementId: 'G-GYEQWGSDMM',
})

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
