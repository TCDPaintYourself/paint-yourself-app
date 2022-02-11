import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Camera } from 'expo-camera'
import Button from 'components/Button'
import { RootStackScreenProps, CameraImage } from 'types'

// https://docs.expo.dev/versions/latest/sdk/camera/
export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [image, setImage] = useState<CameraImage>()
  const cameraRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleSwitchCameraType = () => {
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
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
        <Image style={{ width: '100%', height: '100%' }} source={{ uri: image.uri }} />
      ) : (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button
              title="Take"
              onPress={async () => {
                if (cameraRef.current) {
                  let photo = await cameraRef.current.takePictureAsync()
                  setImage(photo)
                }
              }}
            />
            <Button title="Flip" onPress={handleSwitchCameraType} />
          </View>
        </Camera>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'relative',
    top: 600,
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
})
