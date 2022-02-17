import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as ImgPicker from 'expo-image-picker'
import { Platform, StyleSheet, ImageBackground, ScrollView, Dimensions, Alert } from 'react-native'
import { Text, View } from 'components/Themed'
import { CameraImage } from 'types'
import ThemePicker from 'components/ThemePicker'
import Button from 'components/Button'
import ProjectThemes, { IProjectTheme } from 'constants/ProjectThemes'
import Camera from 'components/Camera'
import * as Sharing from 'expo-sharing'

const { width } = Dimensions.get('screen')
const containerWidth = width * 0.8
const placeholderImageWidth = width * 0.85
const placeholderImageHeight = placeholderImageWidth * (16 / 9) //make the image a 8x10 portrait

export default function NewProjectScreen({ navigation }) {
  const [image, setImage] = useState<CameraImage | null>(null)
  const [projectTheme, setProjectTheme] = useState<IProjectTheme>()
  const [takePhotoMode, setTakePhotoMode] = useState<boolean>(false)

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
      mediaTypes: ImgPicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5], // 8x10 portrait
      quality: 1,
    })

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

  const handleContinue = () => navigation.navigate('ChooseStyleScreen', { image: image.uri })

  if (takePhotoMode) {
    return (
      <View style={styles.container}>
        <Camera image={image} setImage={setImage} closeCamera={closeCamera} />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        {/* <Text style={styles.themeText}>Select Image</Text> */}
        <ImageBackground
          source={{ uri: image ? image.uri : 'https://via.placeholder.com/200x250' }}
          style={styles.placeholderImage}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.buttonContainer}>
            <Button
              onPress={openGallery}
              title={image && !image.camera ? 'Upload different' : 'Upload'}
              variant="primary"
            />

            <Button
              onPress={openCameraResetPhoto}
              title={image && image.camera ? 'Retake Photo' : 'Take Photo'}
              variant="primary"
            />
          </View>
        </ImageBackground>
        {/* <Text style={styles.themeText}>Select Theme</Text> */}
      </View>

      {/* <ThemePicker data={ProjectThemes} setProjectTheme={setProjectTheme} /> */}
      <Button
        // disabled={!image || !projectTheme}
        disabled={!image}
        onPress={handleContinue}
        // style={!image || !projectTheme ? styles.disabledButton : styles.continueButton}
        style={!image ? styles.disabledButton : styles.continueButton}
        title="Continue"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}
    </ScrollView>
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
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginTop: 10,
    height: 1,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    top: placeholderImageHeight - 70,
    marginBottom: 25,
    backgroundColor: 'transparent',
  },
  buttonMargin: {
    marginRight: 8,
    marginLeft: 8,
  },
  placeholderImage: {
    width: placeholderImageWidth,
    height: placeholderImageHeight,
    marginTop: 12,
  },
  continueButton: { alignSelf: 'center', width: containerWidth, marginVertical: 30 },
  disabledButton: { alignSelf: 'center', width: containerWidth, marginVertical: 30, backgroundColor: 'grey' },
})
