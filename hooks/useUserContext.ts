import { useContext } from 'react'

import { UserContext, UserContextType } from 'providers/UserProvider'

/**
 * Custom hook to return a reference to the user context.
 */
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)

  if (context === null) {
    const error = new Error('Component is missing a parent <UserProvider /> component.')

    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, useUserContext)
    }

    throw error
  }

  return context
}
