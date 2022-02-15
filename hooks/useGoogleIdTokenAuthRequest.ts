import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'

import { firebaseClientId } from 'constants/Firebase'

/**
 * Wrapper hook for id token auth request.
 */
export const useGoogleIdTokenAuthRequest = () =>
  useIdTokenAuthRequest({
    clientId: firebaseClientId,
  })
