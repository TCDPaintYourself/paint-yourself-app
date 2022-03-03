import { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { Text, View } from 'components/Themed'
import Button from 'components/Button'
import ThemePicker from 'components/ThemePicker'
import ProjectThemes, { IProjectTheme } from 'constants/ProjectThemes'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import SnackBar from 'react-native-snackbar-component'
import Colors from 'constants/Colors'

const { width, height } = Dimensions.get('screen')
const containerWidth = width * 0.8

type RootStackParamList = {
  ChooseStyleScreen: { image: string }
  FinishedArtScreen: { image: string }
}

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseStyleScreen'>

export default function ChooseStyleScreen({ route, navigation }: Props) {
  const [projectTheme, setProjectTheme] = useState<IProjectTheme>(ProjectThemes[0] || null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { image } = route.params

  //reset loading state to false when user returns to screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false)
    })
    return unsubscribe
  }, [navigation])

  const handleContinue = () => {
    setLoading(true)
    setTimeout(() => {
      navigation.navigate('FinishedArtScreen', { image: image })
    }, 3000)
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
