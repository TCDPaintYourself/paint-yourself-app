import {
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "components/Themed";
import { RootTabScreenProps } from "types";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const IMGS_PER_ROW = 3;
  const GRID_IMG_WIDTH = Dimensions.get("window").width / IMGS_PER_ROW;
  const GRID_IMG_HEIGHT = GRID_IMG_WIDTH; // square images

  const [googleUsername, setGoogleUsername] = useState("");
  const [profilePicSrc, setProfilePicSrc] = useState("");
  const [coverPicSrc, setCoverPicSrc] = useState("");
  const [numCreations, setNumCreations] = useState(0);

  // Array holding user's created images information
  const [dataSource, setDataSource] = useState<
    Array<{ id: number; src: string }>
  >([]);

  useEffect(() => {
    // init temp images
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {
        id: i,
        src:
          `http://placehold.it/${GRID_IMG_WIDTH}x${GRID_IMG_HEIGHT}?text=` +
          (i + 1),
        // src: `https://picsum.photos/${GRID_IMG_WIDTH}/${GRID_IMG_HEIGHT}`,   // an actual image placeholder
      };
    });
    setDataSource(items);

    // TODO: set from API data
    setGoogleUsername("[Google Name]");

    // TODO: set from API data
    setProfilePicSrc(
      require("../assets/images/temp/google_profile_pic_temp.jpg")
    );

    // TODO: set from persistent storage
    setCoverPicSrc(require("../assets/images/temp/cover_photo_temp.jpg"));

    // TODO: set from persistent storage
    setNumCreations(60);
  }, []);

  const updateCoverPhoto = () => {
    console.log("Update Cover Photo");
  };

  return (
    <View style={styles.container}>
      <View style={styles.coverRegion}>
        <ImageBackground
          resizeMode="cover"
          source={coverPicSrc as any}
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
            {googleUsername}
          </Text>
          <View style={styles.profileImgContainer}>
            <Image
              source={profilePicSrc as any}
              resizeMode="cover"
              style={styles.profileImg}
            />
          </View>
          <Text style={styles.numStylegans} numberOfLines={1}>
            <Text style={{ fontWeight: "bold" }}> {numCreations} </Text>
            <Text> Creations </Text>
          </Text>
        </View>
        <View style={styles.creationsContainer}>
          <FlatList
            numColumns={IMGS_PER_ROW}
            data={dataSource}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    margin: 1,
                  }}
                >
                  <Image
                    style={[
                      styles.imageThumbnail,
                      {
                        width: GRID_IMG_WIDTH - GRID_IMG_WIDTH / 9,
                        height: GRID_IMG_HEIGHT - GRID_IMG_HEIGHT / 9,
                      },
                    ]}
                    source={{
                      uri: item.src,
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => "" + item.id}
            contentContainerStyle={styles.grid}
            initialNumToRender={12}
          ></FlatList>
        </View>
      </View>
    </View>
  );
}

// palette: https://colorhunt.co/palette/222831393e46b55400eeeeee
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  content: {
    flex: 4,
    width: "100%",
    // borderColor: "yellow",
    // borderWidth: 1,
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
    borderBottomWidth: 2,
    borderBottomColor: "white",
    // borderColor: "green",
    // borderWidth: 1,
    // justifyContent: "center",
  },
  creationsContainer: {
    flex: 1,
    // borderColor: "purple",
    backgroundColor: "#222831",
    // borderWidth: 1,
    padding: 10,
  },
  googleName: {
    flex: 37.5,
    fontSize: 14,
    textAlign: "center",
    paddingTop: 8,

    // borderColor: "cyan",
    // borderWidth: 1,
  },
  grid: {
    // borderColor: "cyan",
    backgroundColor: "#393E46",
    borderWidth: 1,
    padding: 5,
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    // height: 128,
    // width: 128,
  },
  numStylegans: {
    flex: 37.5,
    fontSize: 14,
    textAlign: "center",
    paddingTop: 8,

    // borderColor: "cyan",
    // borderWidth: 1,
  },
  profileHeader: {
    flexDirection: "row",
    // borderColor: "green",
    backgroundColor: "#222831",
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 8,
    borderBottomColor: "#393E46",
    borderBottomWidth: 1,
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
    backgroundColor: "#222831",
    flex: 25,
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  updateCoverPhotoButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    width: 24,
    color: "rgba(0, 0, 0, 0.75)",
    // borderColor: "orange",
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
  },
});
