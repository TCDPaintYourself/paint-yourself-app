import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, ImageBackground, AppState, AppStateStatus } from 'react-native'
import { Camera } from 'expo-camera'
import { CameraImage } from 'types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CAMERA_ACCESS } from 'constants/LocalStorageKeys'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

interface Props {
  image: CameraImage | null
  setImage: (newImage: CameraImage | null) => void
  closeCamera: () => void
}
export default function CameraScreen({ image, setImage, closeCamera }: Props) {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null)
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current === 'active')
  const [type, setType] = useState(Camera.Constants.Type.back)
  const cameraRef = useRef(null)

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
      try {
        const hasPermission = Boolean(await AsyncStorage.getItem(CAMERA_ACCESS))
        if (!hasPermission) {
          const { status } = await Camera.requestCameraPermissionsAsync()
          setHasPermission(status === 'granted')
          await AsyncStorage.setItem(CAMERA_ACCESS, String(status === 'granted'))
        } else setHasPermission(true)
      } catch (e) {
        // saving error
      }
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
  return (
    <View style={styles.container}>
      {image ? (
        <ImageBackground source={{ uri: image.uri }} style={styles.takenPhoto}>
          <View style={styles.buttonContainer}>
            <FontAwesome name="rotate-left" size={40} color="white" onPress={() => setImage(null)} />
            <AntDesign name="checkcircle" size={40} color="white" onPress={closeCamera} />
          </View>
        </ImageBackground>
      ) : (
        appStateVisible && (
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <AntDesign name="close" size={40} color="white" onPress={closeCamera} style={{ margin: 5 }} />
            <View style={styles.buttonContainer}>
              <AntDesign
                onPress={async () => {
                  if (cameraRef.current) {
                    // @ts-ignore
                    let photo = await cameraRef.current.takePictureAsync()
                    setImage(photo)
                  }
                }}
                name="camera"
                size={40}
                color="white"
                style={{ marginBottom: 8 }}
              />
              <Ionicons name="camera-reverse-sharp" size={40} color="white" onPress={handleSwitchCameraType} />
            </View>
          </Camera>
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'relative',
    top: 630,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
})
