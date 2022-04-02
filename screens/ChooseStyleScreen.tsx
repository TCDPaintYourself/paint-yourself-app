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
  StyleFolderModal: { projectTheme: IProjectTheme; inputImage: string }
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
    navigation.navigate('StyleFolderModal', { projectTheme: projectTheme, inputImage: inputImage })
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
            title="Choose Theme"
          />
          <View style={styles.divider} />
          <View style={styles.uploadStyleContainer}>
            <Text style={styles.uploadStyleText}> OR </Text>
            <Button
              disabled={!projectTheme}
              onPress={handleContinue}
              // style={!projectTheme ? styles.disabledButton : styles.continueButton}
              style={styles.uploadStyleButton}
              title="Upload Your Own"
            />
          </View>
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
    marginVertical: height / 18,
  },
  divider: {
    borderBottomColor: 'grey',
    alignSelf: 'center',
    width: containerWidth,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  loadingText: {
    fontSize: 20,
  },
  spinner: {
    marginVertical: 10,
  },
  continueButton: { alignSelf: 'center', width: containerWidth, marginVertical: 15 },
  disabledButton: { alignSelf: 'center', width: containerWidth, marginVertical: 15, backgroundColor: 'grey' },
  uploadStyleButton: {
    flex: 1,
  },
  uploadStyleContainer: {
    borderWidth: 1,
    alignSelf: 'center',
    paddingTop: 15,
    // borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: containerWidth,
  },
  uploadStyleText: {
    marginHorizontal: '10%',
  },
})
