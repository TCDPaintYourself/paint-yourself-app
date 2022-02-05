import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import ThemePicker from "../components/ThemePicker";
export default function NewProjectScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Select photo to style</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.buttonDiv}>
          <Button onPress={upload} title="Upload" color="#841584" />
          <Button onPress={openCamera} title="Take Photo" color="#841584" />
        </View>
        <Text style={styles.themeText}>Select Theme</Text>
      </View>
      <ThemePicker />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

function upload() {
  console.log("upload");
}

function openCamera() {
  console.log("openCamera");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  themeText: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonDiv: {
    display: "flex",
    flexDirection: "row",
  },
});
