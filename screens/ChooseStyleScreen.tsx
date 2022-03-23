import { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import * as FileSystem from 'expo-file-system'
import SnackBar from 'react-native-snackbar-component'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

import { Text, View } from 'components/Themed'
import Button from 'components/Button'
import ThemePicker from 'components/ThemePicker'
import ProjectThemes, { IProjectTheme, Themes } from 'constants/ProjectThemes'
import Colors from 'constants/Colors'
import { useUserContext } from 'hooks/useUserContext'
import { blobToBase64 } from 'utils/convert'

const { width, height } = Dimensions.get('screen')
const containerWidth = width * 0.8

type RootStackParamList = {
  ChooseStyleScreen: { image: string }
  FinishedArtScreen: { image: string; theme: Themes }
  StyleFolderModal: { projectTheme: IProjectTheme }
}

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseStyleScreen'>

export default function ChooseStyleScreen({ route, navigation }: Props) {
  const [projectTheme, setProjectTheme] = useState<IProjectTheme>(ProjectThemes[0] || null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [user] = useUserContext()
  const { image: inputImage } = route.params

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!loading) return

        // Prevent default behavior of leaving the screen
        e.preventDefault()
      }),
    [loading]
  )

  const handleContinue = async () => {
    navigation.navigate('StyleFolderModal', { projectTheme: projectTheme })
    // const filename = inputImage.split('/').pop()
    // const filetype = filename?.split('.').pop()

    // setLoading(true)

    // const authToken = await user?.getIdToken()

    // const formData = new FormData()
    // // Any type as react-native as a custom FormData implementation.
    // formData.append('input_image', { uri: inputImage, name: filename, type: `image/${filetype}` } as any)

    // let response = null
    // try {
    //   response = await fetch(
    //     `http://paint-yourself.uksouth.cloudapp.azure.com:8080/styled-images?theme=${projectTheme.id}`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         Authorization: `Bearer ${authToken}`,
    //         'Content-Type': 'multipart/form-data',
    //       },
    //       body: formData,
    //     }
    //   )
    // } catch (error: any) {
    //   setSnackbarMessage(error.message)
    //   setSnackbarOpen(true)
    //   setLoading(false)

    //   return
    // }

    // const imageBlob = await response.blob()
    // // Remove metadata.
    // const imageBase64 = (await blobToBase64(imageBlob)).split(',').pop()

    // if (!imageBase64) {
    //   return
    // }

    // const imageUri = `${FileSystem.cacheDirectory}/${uuidv4()}.${filetype}`
    // await FileSystem.writeAsStringAsync(imageUri, imageBase64, {
    //   encoding: FileSystem.EncodingType.Base64,
    // })

    // navigation.navigate('FinishedArtScreen', { image: imageUri, theme: projectTheme.id })
  }

  return (
    <View style={styles.container}>
      <SnackBar
        visible={snackbarOpen}
        textMessage={snackbarMessage}
        actionHandler={() => {
          setSnackbarOpen(false)
        }}
        actionText="close"
      />
      {!loading ? (
        <View>
          <ThemePicker data={ProjectThemes} setProjectTheme={setProjectTheme} />
          <Button
            disabled={!projectTheme}
            onPress={handleContinue}
            style={!projectTheme ? styles.disabledButton : styles.continueButton}
            title="Continue"
          />
        </View>
      ) : (
        <View>
          <ActivityIndicator style={styles.spinner} size={60} color={Colors.primary.background} />
          <Text style={styles.loadingText}>Getting your styled image...</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height / 12,
  },
  loadingText: {
    fontSize: 20,
  },
  spinner: {
    marginVertical: 10,
  },
  continueButton: { alignSelf: 'center', width: containerWidth, marginVertical: 15 },
  disabledButton: { alignSelf: 'center', width: containerWidth, marginVertical: 15, backgroundColor: 'grey' },
})
