import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Button, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function LoginRegisterScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo_dark.png")} resizeMode="contain" style={styles.splash}/>
      <Text style={styles.title}>Continue with Google</Text>
      <FontAwesome.Button name="google" backgroundColor="#FFFFFF" color="#757575" onPress={() => console.log("Login/Register Press")}>
        Login with Google
      </FontAwesome.Button>
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
    // borderWidth: 1,
    borderColor: "green",
    backgroundColor: "black"
  },
  google: {
    color: "red"
  },
  splash: {
    flex:2,
    // borderWidth: 1,
    borderColor: "red",
    width: "65%",
    height: "100%"
  },
  title: {
    flex:1,
    fontSize: 20,
    fontWeight: 'bold',
    // borderWidth: 1,
    borderColor: "red"
  }
});
