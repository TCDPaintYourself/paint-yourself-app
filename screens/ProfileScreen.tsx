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
  const [dataSource, setDataSource] = useState<
    Array<{ id: number; src: string }>
  >([]);

  useEffect(() => {
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {
        id: i,
        src: "http://placehold.it/200x200?text=" + (i + 1),
      };
    });
    setDataSource(items);
  }, []);

  console.log(dataSource);

  const updateCoverPhoto = () => {
    console.log("Update Cover Photo");
  };

  const IMGS_PER_ROW = 3;
  const GRID_IMG_WIDTH = Dimensions.get("window").width / IMGS_PER_ROW;
  console.log(GRID_IMG_WIDTH);
  const GRID_IMG_HEIGHT = GRID_IMG_WIDTH; // square images

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.title} />;

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
        <View style={styles.creationsContainer}>
          <FlatList
            numColumns={IMGS_PER_ROW}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.grid}
            // horizontal={true}
            initialNumToRender={12}
          ></FlatList>
          {/* <Image
            source={{ uri: `https://picsum.photos/${GRID_IMG_WIDTH}` }}
            style={{ width: GRID_IMG_WIDTH, height: GRID_IMG_WIDTH }}
          />
          <Image
            source={{ uri: `https://picsum.photos/${GRID_IMG_WIDTH}` }}
            style={{ width: GRID_IMG_WIDTH, height: GRID_IMG_WIDTH }}
          />
          <Image
            source={{ uri: `https://picsum.photos/${GRID_IMG_WIDTH}` }}
            style={{ width: GRID_IMG_WIDTH, height: GRID_IMG_WIDTH }}
          /> */}
        </View>
      </View>
    </View>
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
  creationsContainer: {
    flex: 1,
    borderColor: "purple",
    borderWidth: 1,
    padding: 10,
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
  grid: {
    borderColor: "cyan",
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
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
