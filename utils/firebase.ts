import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native'

export const app = initializeApp({
  apiKey: 'AIzaSyC8Q8S-aeQi5AvvQiojAeeNRk-j4H5nEMk',
  authDomain: 'tcd-paint-yourself.firebaseapp.com',
  projectId: 'tcd-paint-yourself',
  storageBucket: 'tcd-paint-yourself.appspot.com',
  messagingSenderId: '486967078951',
  appId: '1:486967078951:web:346f738f1267ea41cf1e02',
  measurementId: 'G-GYEQWGSDMM',
})

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
