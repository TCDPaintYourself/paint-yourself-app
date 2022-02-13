import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'

export const useGoogleIdTokenAuthRequest = () =>
  useIdTokenAuthRequest({
    clientId: '486967078951-4q4olam5pvh8p8do8goonmh1udglh6gg.apps.googleusercontent.com',
  })
