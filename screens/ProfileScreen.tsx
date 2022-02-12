import { StyleSheet, Button, ImageBackground, Image } from "react-native";
import { Text, View } from "components/Themed";
import { RootTabScreenProps } from "types";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  function newProject() {
    navigation.navigate("Modal");
  }

  const updateCoverPhoto = () => {
    console.log("Update Cover Photo");
  };
  return (
    <View style={styles.container}>
      <View style={styles.coverRegion}>
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/images/temp/cover_photo_temp.jpg")}
          style={styles.coverImage}
        >
          <View style={styles.updateCoverPhotoButtonContainer}>
            <FontAwesome5
              name="images"
              size={20}
              color="black"
              onPress={updateCoverPhoto}
              style={styles.updateCoverPhotoButton}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <Text style={styles.googleName} numberOfLines={1}>
            [Google Name]
          </Text>
          <View style={styles.profileImgContainer}>
            <Image
              source={require("../assets/images/temp/google_profile_pic_temp.jpg")}
              resizeMode="cover"
              style={styles.profileImg}
            />
          </View>
          <Text style={styles.numStylegans} numberOfLines={1}>
            <Text style={{ fontWeight: "bold" }}> N </Text>
            <Text> StyleGans </Text>
          </Text>
        </View>
        {/* <Text>Hello</Text> */}
      </View>
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Profile</Text>
    //   <View
    //     style={styles.separator}
    //     lightColor="#eee"
    //     darkColor="rgba(255,255,255,0.1)"
    //   />
    //   <Button
    //     onPress={newProject}
    //     title="NEW PROJECT"
    //     color="#841584"
    //     accessibilityLabel="Learn more about this purple button"
    //   />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: 15,
    borderColor: "red",
    borderWidth: 1,
  },
  content: {
    flex: 4,
    // flexDirection: "row",
    width: "100%",
    borderColor: "yellow",
    borderWidth: 1,
  },
  coverImage: {
    flex: 1,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  coverRegion: {
    flex: 1,
    width: "100%",
    borderColor: "green",
    borderWidth: 1,
    // justifyContent: "center",
  },
  googleName: {
    flex: 37.5,
    fontSize: 14,
    textAlign: "center",
    // paddingLeft: 5,
    // paddingRight: 5,
    // borderColor: "cyan",
    borderWidth: 1,
  },
  numStylegans: {
    flex: 37.5,
    fontSize: 14,
    textAlign: "center",
    // borderColor: "cyan",
    borderWidth: 1,
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  profileHeader: {
    flexDirection: "row",
    borderColor: "green",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  profileImg: {
    width: 80,
    height: 80,
    marginTop: -(80 / 2), // 1/2 height
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImgContainer: {
    flex: 25,
    alignItems: "center",
    // borderColor: "red",
    borderWidth: 1,
  },
  updateCoverPhotoButton: {
    // width: "25%",
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    width: 24,
    color: "rgba(0, 0, 0, 0.75)",
    // backgroundColor: "rgba(52, 52, 52, 0.2)",
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    // elevation: 0.4,
    borderColor: "orange",
    // borderWidth: 1,
    marginTop: 1,
  },
  updateCoverPhotoButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    // borderColor: "orange",
    // borderWidth: 1,
    marginBottom: "2%",
    marginRight: "2%",
    paddingTop: 5,
    padding: 4,
    borderRadius: 5,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    // elevation: 0.4,
  },
});
