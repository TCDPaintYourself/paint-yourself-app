import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';

export default function NewProjectScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select photo to style</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.buttonDiv}>
        <Button
          onPress={upload}
          title="Upload"
          color="#841584"
        />
        <Button
          onPress={openCamera}
          title="Take Photo"
          color="#841584"
        />
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

function upload() {
  console.log("upload")
}

function openCamera() {
  console.log("openCamera")
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
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
});
