import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'

import { androidClientId, firebaseClientId, iosClientId } from 'constants/Firebase'

/**
 * Wrapper hook for id token auth request.
 */
export const useGoogleIdTokenAuthRequest = () =>
  useIdTokenAuthRequest({
    expoClientId: firebaseClientId,
    webClientId: firebaseClientId,
    androidClientId,
    iosClientId,
  })
