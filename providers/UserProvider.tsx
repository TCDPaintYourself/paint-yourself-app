import { createContext } from 'react'
import { User } from 'firebase/auth'

export type UserContextType = [User | null, React.Dispatch<React.SetStateAction<User | null>>]

/**
 * User context.
 */
export const UserContext = createContext<UserContextType | null>(null)
export const UserProvider = UserContext.Provider
