import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'

import { firebaseConfig } from 'constants/Firebase'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native'

export const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
