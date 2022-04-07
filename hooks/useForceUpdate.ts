import { useState } from 'react'

/**
 * Custom hook to force React to re-render.
 */
export const useForceUpdate = () => {
  const [_object, setObject] = useState<{}>(Object.create(null))

  const forceUpdate = () => setObject(Object.create(null))

  return forceUpdate
}
