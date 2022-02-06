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
  // select random background image
  const NUM_BG_IMAGES = 8;
  const images = [
    require("../assets/images/auth_bgs/auth_background_1.jpg"),
    require("../assets/images/auth_bgs/auth_background_2.jpg"),
    require("../assets/images/auth_bgs/auth_background_3.jpg"),
    require("../assets/images/auth_bgs/auth_background_4.jpg"),
    require("../assets/images/auth_bgs/auth_background_5.jpg"),
    require("../assets/images/auth_bgs/auth_background_6.jpg"),
    require("../assets/images/auth_bgs/auth_background_7.jpg"),
    require("../assets/images/auth_bgs/auth_background_8.jpg"),
  ];
  const bg_image_index = Math.floor(Math.random() * (NUM_BG_IMAGES - 1)) + 1;

  // Front-end oauth here
  const googleAuth = () => {
    navigation.navigate("Modal");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={images[bg_image_index]}
        style={styles.bgImage}
      >
        <Image
          source={require("../assets/images/logo_dark_sh.png")}
          resizeMode="contain"
          style={styles.logo}
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
    alignItems: "center",
    borderWidth: 1,
    // borderColor: "green",
    backgroundColor: "black",
  },
  google: {
    textAlign: "center",
    borderWidth: 1,
    // borderColor: "red",
  },
  logo: {
    // flex: 1,
    alignItems: "center",
    marginLeft: 10,
    // borderWidth: 1,
    borderColor: "green",
    width: "85%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    // borderWidth: 1,
    marginBottom: 40,
    marginTop: 160,
    letterSpacing: 0,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    // borderColor: "red",
  },
});
