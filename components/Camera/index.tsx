import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, ImageBackground, AppState, AppStateStatus, Platform, Dimensions } from 'react-native'
import { Camera } from 'expo-camera'
import { CameraImage } from 'types'
import { AntDesign, FontAwesome, Ionicons, Feather } from '@expo/vector-icons'

interface Props {
  image: CameraImage | null
  setImage: (newImage: CameraImage | null) => void
  closeCamera: () => void
}

const ICON_SIZE = 40

const { width } = Dimensions.get('screen')
const height = width * (16 / 9)

export default function CameraScreen({ image, setImage, closeCamera }: Props) {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null)
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current === 'active')
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [available, setAvailable] = useState<boolean>(true)
  const cameraRef = useRef<Camera>(null)

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    }
    const cameraIsAvailable = async () => {
      let available = await Camera.isAvailableAsync()
      setAvailable(available)
    }
    if (Platform.OS === 'web') {
      cameraIsAvailable()
    }
    requestPermissions()
  }, [])

  useEffect(() => {
    AppState.addEventListener('change', handleNextAppState)

    return () => {
      AppState.removeEventListener('change', handleNextAppState)
    }
  }, [])

  const handleSwitchCameraType = () => {
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
  }

  const handleNextAppState = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState
    setAppStateVisible(appState.current === 'active')
  }

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  if (!available) {
    return <Text>Device has no camera</Text>
  }

  return (
    <View style={styles.container}>
      {image ? (
        <ImageBackground source={{ uri: image.uri }} style={styles.takenPhoto}>
          <View style={styles.buttonContainer}>
            <FontAwesome name="rotate-left" size={ICON_SIZE} color="white" onPress={() => setImage(null)} />
            <Feather name="check-circle" size={ICON_SIZE} color="white" onPress={closeCamera} />
          </View>
        </ImageBackground>
      ) : (
        appStateVisible && (
          <Camera style={styles.camera} type={type} ratio="16:9" ref={cameraRef}>
            <View style={styles.cameraContainer}>
              <AntDesign name="close" size={ICON_SIZE} color="white" onPress={closeCamera} style={styles.closeButton} />
              <View style={styles.buttonContainer}>
                <AntDesign
                  onPress={async () => {
                    if (cameraRef.current) {
                      let photo = await cameraRef.current.takePictureAsync()
                      setImage({ ...photo, camera: true })
                    }
                  }}
                  name="camera"
                  size={ICON_SIZE}
                  color="white"
                  style={styles.takePhotoButton}
                />
                <Ionicons name="camera-reverse-sharp" size={ICON_SIZE} color="white" onPress={handleSwitchCameraType} />
              </View>
            </View>
          </Camera>
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width,
    height,
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexGrow: 1,
    marginBottom: 25,
  },
  button: {
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  takenPhoto: {
    resizeMode: 'cover',
    flex: 1,
  },
  closeButton: {
    margin: 5,
  },
  takePhotoButton: {
    margin: 3, // place icon in correct position due to spacing
  },
})
