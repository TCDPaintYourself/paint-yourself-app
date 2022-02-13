import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'

import { firebaseClientId } from 'constants/Firebase'

export const useGoogleIdTokenAuthRequest = () =>
  useIdTokenAuthRequest({
    clientId: firebaseClientId,
  })
