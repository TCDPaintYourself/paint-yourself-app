import {useState} from "react"
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import { Text, View } from 'components/Themed'
import ThemePicker from 'components/ThemePicker'
import Button from 'components/Button'

export default function NewProjectScreen() {
  const [projectTheme, setProjectTheme] = useState()
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Select photo to style</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.buttonDiv}>
          <View style={styles.buttonMargin}>
            <Button onPress={upload} title="Upload" variant="primary" />
          </View>
          <View style={styles.buttonMargin}>
            <Button onPress={openCamera} title="Take Photo" variant="primary" />
          </View>
        </View>
        <Text style={styles.themeText}>Select Theme</Text>
      </View>
      <ThemePicker />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

function upload() {
  console.log('upload')
}

function openCamera() {
  console.log('openCamera')
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
    marginVertical: 30,
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
})
