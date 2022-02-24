import { useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, Image, ScrollView, Dimensions } from 'react-native'
import { Text, View } from 'components/Themed'
import Button from 'components/Button'
import ThemePicker from 'components/ThemePicker'
import ProjectThemes, { IProjectTheme } from 'constants/ProjectThemes'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import SnackBar from 'react-native-snackbar-component'
import axios from 'axios'

const { width, height } = Dimensions.get('screen')
const containerWidth = width * 0.8

type RootStackParamList = {
  ChooseStyleScreen: { image: string }
  FinishedArtScreen: { image: string }
}

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseStyleScreen'>

export default function ChooseStyleScreen({ route, navigation }: Props) {
  const [projectTheme, setProjectTheme] = useState<IProjectTheme>(ProjectThemes[0] || null)
  const [loading, setLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const { image } = route.params

  const handleContinue = () => {
    setLoading(true)
    let formData = new FormData()
    let filename = image.split('/').pop() || 'image.jpg'
    let match = /\.(\w+)$/.exec(filename)
    let type = match ? `image/${match[1]}` : `image`
    formData.append('image', { uri: image, name: filename, type } as any)
    formData.append('theme', projectTheme.name)
    axios
      .post('https://stylegan.free.beeceptor.com/styled-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((result) => {
        console.log(result.data)
        setLoading(false)
        setSnackbarOpen(false)
        navigation.navigate('FinishedArtScreen', { image: image })
      })
      .catch((e) => {
        console.log(e)
        setSnackbarMessage('Error creating StyleGan')
        setSnackbarOpen(true)
        setLoading(false)
      })
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
      <ThemePicker data={ProjectThemes} setProjectTheme={setProjectTheme} />
      <Button
        disabled={!projectTheme || loading}
        onPress={handleContinue}
        style={!projectTheme ? styles.disabledButton : styles.continueButton}
        title="Continue"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 200,
  },
  continueButton: { alignSelf: 'center', width: containerWidth, marginVertical: 15 },
  disabledButton: { alignSelf: 'center', width: containerWidth, marginVertical: 15, backgroundColor: 'grey' },
})
