import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as ImgPicker from 'expo-image-picker'
import { Platform, StyleSheet } from 'react-native'
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

  console.log(image)

  const openCamera = () => {
    setTakePhotoMode(true)
    setImage(null)
  }

  const closeCamera = () => {
    setTakePhotoMode(false)
  }

  const openGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImgPicker.launchImageLibraryAsync({
      mediaTypes: ImgPicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    setImage(null)

    if (!result.cancelled) {
      setImage({ uri: result.uri, width: result.width, height: result.height, camera: false })
    }
  }

  const resetPhoto = () => {
    setImage(null)
  }

  const openCameraResetPhoto = () => {
    openCamera()
    resetPhoto()
  }

  return (
    <View style={styles.container}>
      {takePhotoMode ? (
        <Camera image={image} setImage={setImage} closeCamera={closeCamera} />
      ) : (
        <>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View style={styles.buttonDiv}>
              <View style={styles.buttonMargin}>
                <Button
                  onPress={openGallery}
                  title={image && !image.camera ? 'Upload different' : 'Upload'}
                  variant="primary"
                />
              </View>
              <View style={styles.buttonMargin}>
                <Button
                  onPress={openCameraResetPhoto}
                  title={image && image.camera ? 'Retake Photo' : 'Take Photo'}
                  variant="primary"
                />
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
    marginTop: 10,
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
    marginTop: 16,
  },
  photoTaken: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
})
