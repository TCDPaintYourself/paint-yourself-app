import { useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, Image, ScrollView, Dimensions } from 'react-native'
import { Text, View } from 'components/Themed'
import Button from 'components/Button'
import ThemePicker from 'components/ThemePicker'
import ProjectThemes, { IProjectTheme } from 'constants/ProjectThemes'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import SnackBar from 'react-native-snackbar-component'

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
    navigation.navigate('FinishedArtScreen', { image: image })
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
