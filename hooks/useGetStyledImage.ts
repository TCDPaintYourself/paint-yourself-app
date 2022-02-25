import { useEffect, useState } from 'react'

import { CameraImage } from 'types'
import { blobToBase64 } from 'utils/convert'
import { useUserContext } from 'hooks/useUserContext'

export type GetStyledImageType = [boolean, Error | null, string | null]

/**
 * Hook to return a styled image.
 *
 * @param image Image to style.
 * @param theme Theme to style image with.
 */
export const useGetStyledImage = (image: CameraImage, theme: string): GetStyledImageType => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [user] = useUserContext()

  const filename = image.uri.split('/').pop()
  const filetype = filename?.split('.').pop()

  /**
   * Fetch styled image from the backend.
   */
  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        const authToken = await user?.getIdToken()

        const formData = new FormData()
        // Any type as react-native as a custom FormData implementation.
        formData.append('input_image', { uri: image.uri, name: filename, type: `image/${filetype}` } as any)

        const response = await fetch(
          `http://paint-yourself.uksouth.cloudapp.azure.com:8080/styled-images?theme=${theme}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          }
        )
        const blob = await response.blob()
        const base64 = await blobToBase64(blob)

        setImageBase64(base64)
      } catch (error: any) {
        console.log({ error })
        setError(error)
      }

      setIsLoading(false)
    })()
  }, [theme, image])

  return [isLoading, error, imageBase64]
}
