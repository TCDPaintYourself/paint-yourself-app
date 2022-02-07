import React, { useState, useRef } from "react";
import {
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Text, View, Icon } from "../../components/Themed";
const { width, height } = Dimensions.get("screen");
type Props = {};

const data = [
  "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
];

const imageW = width * 0.8;
const imageH = imageW * 1.54;

function index({}: Props) {
  const [page, setPage] = useState<number>(0);

  console.log(page);

  const onScrollEnd = (e: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    let pageIndex = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5), 0),
      data.length
    );
    if (page !== pageIndex) setPage(pageIndex);
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={onScrollEnd}
        scrollEventThrottle={32}
        renderItem={({ item }: any) => {
          return (
            <View style={{ width, alignItems: "center"}}>
              <ImageBackground source={{ uri: item }} style={styles.cardImage} imageStyle={{ borderRadius: 16, opacity: 0.7}}>
                <Text style={styles.subtitle}>Van Gough</Text>
              </ImageBackground>
            </View>
          );
        }}
      />
      <View style={styles.circleSelector}>
        {[...Array(data.length)].map((_, i) => (
          <Icon
            key={`circle-selector-${i}`}
            name={i === page ? "circle" : "circle-o"}
            size={i === page ? 9 : 8}
            style={{margin: 12}}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 5,
    fontWeight: "bold",
    position: 'relative',
    top: imageH-48,
    left: 12,
    fontSize: 24
  },
  circleSelector: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  cardImage: {
    width: imageW,
    height: imageH,
    resizeMode: "cover",
  },
});

export default index;
