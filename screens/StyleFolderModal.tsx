import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Image, Dimensions, TouchableHighlight } from 'react-native'
import { Text, View } from 'components/Themed' // need view
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import ProjectThemes, { IProjectTheme, Themes } from 'constants/ProjectThemes'
import { WhiteBalance } from 'expo-camera/build/Camera.types'
import Button from 'components/Button'
import { useUserContext } from 'hooks/useUserContext'
import { blobToBase64 } from 'utils/convert'
import * as FileSystem from 'expo-file-system'
import { v4 as uuidv4 } from 'uuid'

type RootStackParamList = {
  StyleFolderModal: { projectTheme: IProjectTheme; inputImage: string }
  FinishedArtScreen: { image: string; theme: Themes }
}

type Props = NativeStackScreenProps<RootStackParamList, 'StyleFolderModal'>

const StyleFolderModal: React.FC<Props> = ({ route, navigation }) => {
  //   const { name, filepath } = route.params
  const { projectTheme, inputImage } = route.params
  const [user] = useUserContext()

  // const [themeImages, setThemeImages] = useState<number[]>([])
  // const [themeImages, setThemeImages] = useState([
  //   { id: 0, src: require('../assets/images/themes/van-gogh/self-portrait.jpg') },
  //   { id: 1, src: require('../assets/images/themes/van-gogh/cafe-terrace-at-night.jpg') },
  //   { id: 2, src: require('../assets/images/themes/van-gogh/starry-night.jpg') },
  //   { id: 3, src: require('../assets/images/themes/van-gogh/wheat-field.jpg') },
  // ])

  // const themeFilepaths = {
  //   // [Themes.VANGOUGH]: [
  //   //   ,
  //   //   'assets/images/themes/van-gogh/cafe-terrace-at-night.jpg',
  //   //   'assets/images/themes/van-gogh/self-portrait-with-a-felt-grey-hat.jpg',
  //   //   'assets/images/themes/van-gogh/starry-night.jpg',
  //   //   'assets/images/themes/van-gogh/wheat-field.jpg',
  //   // ],
  //   [Themes.VANGOUGH]: [
  //     { id: 0, src: require('../assets/images/themes/van-gogh/self-portrait.jpg') },
  //     { id: 1, src: require('../assets/images/themes/van-gogh/cafe-terrace-at-night.jpg') },
  //     { id: 2, src: require('../assets/images/themes/van-gogh/starry-night.jpg') },
  //     { id: 3, src: require('../assets/images/themes/van-gogh/wheat-field.jpg') },
  //   ],
  // }

  const [themeImages, setThemeImages] = useState([])

  // const [themeImages, setThemeImages] = useState(themeFilepaths[projectTheme.id])

  const IMGS_PER_ROW = 2
  const GRID_IMG_WIDTH = (Dimensions.get('window').width * 0.95) / IMGS_PER_ROW
  const GRID_IMG_HEIGHT = GRID_IMG_WIDTH // square images

  useEffect(() => {
    // set title
    navigation.setOptions({ headerTitle: `'${projectTheme.name}' styles` })
    // console.log(themeImages)

    // set images
    if (projectTheme.id == Themes.VANGOUGH) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/van-gogh/self-portrait.jpg') },
        { id: 1, src: require('../assets/images/themes/van-gogh/cafe-terrace-at-night.jpg') },
        { id: 2, src: require('../assets/images/themes/van-gogh/starry-night.jpg') },
        { id: 3, src: require('../assets/images/themes/van-gogh/wheat-field.jpg') },
      ])
    } else if (projectTheme.id == Themes.DAVINCI) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/da-vinci/mona-lisa.jpg') },
        { id: 1, src: require('../assets/images/themes/da-vinci/tobias-and-the-angel.jpg') },
        { id: 2, src: require('../assets/images/themes/da-vinci/virgin-of-the-rocks.jpg') },
        { id: 3, src: require('../assets/images/themes/da-vinci/vitruvian-man.jpg') },
      ])
    }
    // } else if (projectTheme.id == Themes.EXPRESSIONISM) {
    //   setThemeImages([
    //     { id: 0, src: require('../assets/images/themes/expressionism/mona-lisa.jpg') },
    //     { id: 1, src: require('../assets/images/themes/expressionism/tobias-and-the-angel.jpg') },
    //     { id: 2, src: require('../assets/images/themes/expressionism/virgin-of-the-rocks.jpg') },
    //     { id: 3, src: require('../assets/images/themes/expressionism/vitruvian-man.jpg') },
    //   ])
    // }

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

  // TODO: submit image for styling
  const handleImagePress = () => {
    console.log('handleImagePress')
  }

  const handleContinue = async () => {
    const filename = inputImage.split('/').pop()
    const filetype = filename?.split('.').pop()

    // setLoading(true)

    const authToken = await user?.getIdToken()

    const formData = new FormData()
    // Any type as react-native as a custom FormData implementation.
    formData.append('input_image', { uri: inputImage, name: filename, type: `image/${filetype}` } as any)

    let response = null
    try {
      response = await fetch(
        `http://paint-yourself.uksouth.cloudapp.azure.com:8080/styled-images?theme=${projectTheme.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      )
    } catch (error: any) {
      // setSnackbarMessage(error.message)
      // setSnackbarOpen(true)
      // setLoading(false)
      console.log('Error sending image')

      return
    }

    const imageBlob = await response.blob()
    // Remove metadata.
    const imageBase64 = (await blobToBase64(imageBlob)).split(',').pop()

    if (!imageBase64) {
      return
    }

    const imageUri = `${FileSystem.cacheDirectory}/${uuidv4()}.${filetype}`
    await FileSystem.writeAsStringAsync(imageUri, imageBase64, {
      encoding: FileSystem.EncodingType.Base64,
    })

    navigation.navigate('FinishedArtScreen', { image: imageUri, theme: projectTheme.id })
  }

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
            <TouchableHighlight onPress={() => handleImagePress()}>
              <Image
                source={item.src}
                key={item.id}
                style={{
                  width: GRID_IMG_WIDTH,
                  height: GRID_IMG_HEIGHT,
                  resizeMode: 'cover',
                  borderColor: 'white',
                  margin: 2,
                  borderWidth: 1,
                }}
              />
            </TouchableHighlight>
          )}
        />
      </View>
      <Button title="Continue" onPress={handleContinue}></Button>
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
