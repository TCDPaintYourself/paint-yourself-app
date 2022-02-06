import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { Text, View } from "../components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { RootTabScreenProps } from "../types";

export default function LoginRegisterScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  // Front-end oauth here
  const googleAuth = () => {
    navigation.navigate("Modal");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("../assets/images/auth-background.jpg")}
        style={styles.bgImage}
      >
        <Image
          source={require("../assets/images/logo_dark_sh.png")}
          resizeMode="contain"
          style={styles.splashImage}
        />
        <Text style={styles.title}>Continue with Google:</Text>
        <FontAwesome.Button
          name="google"
          backgroundColor="#FFFFFF"
          color="#757575"
          onPress={googleAuth}
          iconStyle={{ marginRight: "15%" }}
          size={25}
          style={styles.google}
        >
          Login with Google
        </FontAwesome.Button>
      </ImageBackground>
    </View>
    // <View style={styles.container}>
    //   <View style={styles.splash}>
    //     <ImageBackground
    //       source={require("../assets/images/auth-background.jpg")}
    //       resizeMode="cover"
    //       style={styles.image}
    //     >
    //       <Image
    //         source={require("../assets/images/logo_dark.png")}
    //         resizeMode="contain"
    //         style={styles.splashImage}
    //       />
    //     </ImageBackground>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.title}>Continue with Google:</Text>
    //     <FontAwesome.Button
    //       name="google"
    //       backgroundColor="#FFFFFF"
    //       color="#757575"
    //       onPress={googleAuth}
    //       iconStyle={{ marginRight: "15%" }}
    //       size={25}
    //       style={styles.google}
    //     >
    //       Login with Google
    //     </FontAwesome.Button>
    //   </View>
    //   {/* Use a light status bar on iOS to account for the black space above the modal */}
    //   <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    // </View>
  );
}

function upload() {
  console.log("upload");
}

function openCamera() {
  console.log("openCamera");
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderColor: "red",
  },
  container: {
    flex: 1,
    // padding: 20,
    alignItems: "center",
    borderWidth: 1,
    // borderColor: "green",
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    borderWidth: 1,
    // borderColor: "grey",
    padding: 10,
  },
  google: {
    textAlign: "center",
    borderWidth: 1,
    // borderColor: "red",
  },
  splash: {
    flex: 2,
    width: "100%",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "grey",
  },
  splashImage: {
    // flex: 1,
    alignItems: "center",
    marginLeft: 10,
    // marginTop: "30%",
    // borderWidth: 1,
    borderColor: "green",
    width: "85%",
  },
  title: {
    // flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    // borderWidth: 1,
    marginBottom: 40,
    marginTop: 160,
    letterSpacing: 0,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
    // borderColor: "red",
  },
});
