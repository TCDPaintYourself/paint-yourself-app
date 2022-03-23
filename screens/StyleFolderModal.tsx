import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import { Text, View } from 'components/Themed' // need view
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import ProjectThemes, { IProjectTheme, Themes } from 'constants/ProjectThemes'
import { WhiteBalance } from 'expo-camera/build/Camera.types'

type RootStackParamList = {
  StyleFolderModal: { projectTheme: IProjectTheme }
}

type Props = NativeStackScreenProps<RootStackParamList, 'StyleFolderModal'>

const StyleFolderModal: React.FC<Props> = ({ route, navigation }) => {
  //   const { name, filepath } = route.params
  const { projectTheme } = route.params
  // const [themeImages, setThemeImages] = useState<number[]>([])
  const [themeImages, setThemeImages] = useState([
    { id: 0, src: require('../assets/images/themes/van-gogh/self-portrait.jpg') },
    { id: 1, src: require('../assets/images/themes/van-gogh/cafe-terrace-at-night.jpg') },
    { id: 2, src: require('../assets/images/themes/van-gogh/starry-night.jpg') },
    { id: 3, src: require('../assets/images/themes/van-gogh/wheat-field.jpg') },
  ])

  const themeFilepaths = {
    [Themes.VANGOUGH]: [
      ,
      'assets/images/themes/van-gogh/cafe-terrace-at-night.jpg',
      'assets/images/themes/van-gogh/self-portrait-with-a-felt-grey-hat.jpg',
      'assets/images/themes/van-gogh/starry-night.jpg',
      'assets/images/themes/van-gogh/wheat-field.jpg',
    ],
  }

  const IMGS_PER_ROW = 2
  const GRID_IMG_WIDTH = (Dimensions.get('window').width * 0.95) / IMGS_PER_ROW
  const GRID_IMG_HEIGHT = GRID_IMG_WIDTH // square images

  useEffect(() => {
    // set title
    navigation.setOptions({ headerTitle: `'${projectTheme.name}' styles` })
    // console.log(themeImages)

    // require the images in theme folder
    // TODO: change from hardcoded van gough
    // requireImages(projectTheme.id)
  }, [])

  // const requireImages = (projectTheme: Themes) => {
  //   console.log('HELLO')

  //   const images: number[] = []

  //   if (projectTheme == Themes.VANGOUGH) {
  //     images.push(require('../assets/images/themes/van-gogh/self-portrait.jpg'))
  //     images.push(require('../assets/images/themes/van-gogh/cafe-terrace-at-night.jpg'))
  //     images.push(require('../assets/images/themes/van-gogh/starry-night.jpg'))
  //     images.push(require('../assets/images/themes/van-gogh/wheat-field.jpg'))
  //   } else if (projectTheme == Themes.CLAUDEMONET) {
  //   } else if (projectTheme == Themes.REMBRANDT) {
  //   } else if (projectTheme == Themes.WHISTLER) {
  //   } else if (projectTheme == Themes.PICASSO) {
  //   } else if (projectTheme == Themes.DAVINCI) {
  //   } else if (projectTheme == Themes.CARAVAGGIO) {
  //   } else if (projectTheme == Themes.POPART) {
  //   } else if (projectTheme == Themes.IMPRESSIONISM) {
  //   } else if (projectTheme == Themes.EXPRESSIONISM) {
  //   } else if (projectTheme == Themes.ARTNOUVEAU) {
  //   }

  //   for (const img of images) {
  //     console.log(img)
  //   }

  //   setThemeImages(images)
  // }

  return (
    <View style={styles.container}>
      <Text>{projectTheme.name}</Text>
      <View style={styles.scrollViewContainer}>
        {/* <Image source={themeImages[0]} /> */}
        <FlatList
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={themeImages}
          columnWrapperStyle={{ flex: 1, justifyContent: 'center', paddingTop: 10 }}
          renderItem={({ item, index }) => (
            <Image
              source={item.src}
              key={item.id}
              // style={{
              //   // width: 260,
              //   // height: 300,
              //   borderWidth: 2,
              //   borderColor: '#d35647',
              //   resizeMode: 'contain',
              //   margin: 8,
              // }}
              style={{
                width: GRID_IMG_WIDTH,
                height: GRID_IMG_HEIGHT,
                resizeMode: 'cover',
                borderColor: 'white',
                margin: 2,
                borderWidth: 1,
              }}
            />
          )}
        />
      </View>
    </View>
  )
}

export default StyleFolderModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
  scrollViewContainer: {
    flex: 1,
    height: '100%',
    borderWidth: 1,
    borderColor: 'red',
  },
  // flatListImage: {
  //   // width: 300,
  //   // height: 300,
  //   resizeMode: 'cover',
  //   borderColor: 'white',
  //   borderWidth: 1,
  // },
})
