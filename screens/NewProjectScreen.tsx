import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Image } from 'react-native'
import { Text, View } from 'components/Themed'
import { RootStackScreenProps, CameraImage } from 'types'
import ThemePicker from 'components/ThemePicker'
import Button from 'components/Button'
import ProjectThemes, { IProjectTheme } from 'constants/ProjectThemes'
import Camera from 'components/Camera'

export default function NewProjectScreen() {
  const [projectTheme, setProjectTheme] = useState<IProjectTheme>()
  const [image, setImage] = useState<CameraImage | null>(null)
  const [takePhotoMode, setTakePhotoMode] = useState<boolean>(false)
  const [uploadPhotoMode, setUploadPhotoMode] = useState<boolean>(false)

  console.log(image)

  const openCamera = () => {
    setTakePhotoMode(true)
  }

  const closeCamera = () => {
    setTakePhotoMode(false)
  }

  const openGallery = () => {
    setUploadPhotoMode(true)
  }

  const closeGallery = () => {
    setUploadPhotoMode(false)
  }

  return (
    <View style={styles.container}>
      {takePhotoMode ? (
        <Camera image={image} setImage={setImage} closeCamera={closeCamera} />
      ) : (
        <>
          <View style={{ alignItems: 'center' }}>
            {image && <Image style={styles.photoTaken} source={{ uri: image.uri }} />}
            <View style={styles.buttonDiv}>
              <View style={styles.buttonMargin}>
                <Button onPress={openGallery} title="Upload" variant="primary" />
              </View>
              <View style={styles.buttonMargin}>
                <Button onPress={openCamera} title={image ? 'Retake Photo' : 'Take Photo'} variant="primary" />
              </View>
            </View>
            <Text style={styles.themeText}>Select Theme</Text>
          </View>
          <ThemePicker data={ProjectThemes} setProjectTheme={setProjectTheme} />
        </>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeText: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 20,
    height: 1,
    width: '80%',
  },
  buttonDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonMargin: {
    marginRight: 8,
    marginLeft: 8,
  },
  photoTaken: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
})
