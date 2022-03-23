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
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

type RootStackParamList = {
  StyleFolderModal: { projectTheme: IProjectTheme; inputImage: string }
  FinishedArtScreen: { image: string; theme: Themes }
}

type Props = NativeStackScreenProps<RootStackParamList, 'StyleFolderModal'>

const StyleFolderModal: React.FC<Props> = ({ route, navigation }) => {
  const IMGS_PER_ROW = 2
  const GRID_IMG_WIDTH = (Dimensions.get('window').width * 0.95) / IMGS_PER_ROW
  const GRID_IMG_HEIGHT = GRID_IMG_WIDTH // square images

  const { projectTheme, inputImage } = route.params
  const [user] = useUserContext()

  const [themeImages, setThemeImages] = useState<{ id: number; src: number }[]>([])
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0)

  useEffect(() => {
    // set title
    navigation.setOptions({ headerTitle: `Select a '${projectTheme.name}' style:` })

    // set images for this theme
    updateThemeImages()
  }, [])

  const updateThemeImages = () => {
    if (projectTheme.id == Themes.ARTNOUVEAU) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/art-nouveau/klimt_hygieia.jpg') },
        { id: 1, src: require('../assets/images/themes/art-nouveau/klimt_the-kiss.jpg') },
        { id: 2, src: require('../assets/images/themes/art-nouveau/mucha_daydream.png') },
        { id: 3, src: require('../assets/images/themes/art-nouveau/mucha_la-plume.jpg') },
      ])
    } else if (projectTheme.id == Themes.CARAVAGGIO) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/caravaggio/penitent-magdelene.jpg') },
        { id: 1, src: require('../assets/images/themes/caravaggio/self-portrait.jpg') },
        { id: 2, src: require('../assets/images/themes/caravaggio/the-crowning-with-thorns.jpg') },
        { id: 3, src: require('../assets/images/themes/caravaggio/the-entombment-of-christ.jpg') },
      ])
    } else if (projectTheme.id == Themes.CLAUDEMONET) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/claude-monet/arm-of-the-seine.jpg') },
        { id: 1, src: require('../assets/images/themes/claude-monet/garden-at-giverny.jpg') },
        { id: 2, src: require('../assets/images/themes/claude-monet/water-lillies.jpg') },
        { id: 3, src: require('../assets/images/themes/claude-monet/woman-with-a-parasol.jpg') },
      ])
    } else if (projectTheme.id == Themes.DAVINCI) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/da-vinci/mona-lisa.jpg') },
        { id: 1, src: require('../assets/images/themes/da-vinci/tobias-and-the-angel.jpg') },
        { id: 2, src: require('../assets/images/themes/da-vinci/virgin-of-the-rocks.jpg') },
        { id: 3, src: require('../assets/images/themes/da-vinci/vitruvian-man.jpg') },
      ])
    } else if (projectTheme.id == Themes.EXPRESSIONISM) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/expressionism/betzler_reclining-couple.jpg') },
        { id: 1, src: require('../assets/images/themes/expressionism/kirchner_sertigtal-in-autumn.jpg') },
        { id: 2, src: require('../assets/images/themes/expressionism/munch_the-scream.jpg') },
        { id: 3, src: require('../assets/images/themes/expressionism/pechstein_leba-harbour.jpg') },
        { id: 4, src: require('../assets/images/themes/expressionism/roestenburg_eifel-summer.jpg') },
      ])
    } else if (projectTheme.id == Themes.IMPRESSIONISM) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/impressionism/afremov_sleeping-city.jpeg') },
        { id: 1, src: require('../assets/images/themes/impressionism/pissarro_miribeau-garden.jpg') },
        { id: 2, src: require('../assets/images/themes/impressionism/renoir_girls-at-the-piano.jpg') },
        { id: 3, src: require('../assets/images/themes/impressionism/sargent_in-a-levantine-port.jpg') },
      ])
    } else if (projectTheme.id == Themes.PICASSO) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/picasso/girl-before-a-mirror.jpg') },
        { id: 1, src: require('../assets/images/themes/picasso/girl-with-a-mandolin.jpg') },
        { id: 2, src: require('../assets/images/themes/picasso/les-femmes-dalgiers.jpg') },
        { id: 3, src: require('../assets/images/themes/picasso/the-weeping-woman.jpg') },
      ])
    } else if (projectTheme.id == Themes.POPART) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/pop-art/hamilton_fashion-plate.jpg') },
        { id: 1, src: require('../assets/images/themes/pop-art/rauschenberg_retroactive.jpg') },
        { id: 2, src: require('../assets/images/themes/pop-art/wain_kaleidoscope-cat.jpg') },
        { id: 3, src: require('../assets/images/themes/pop-art/warhol_marilyn.jpg') },
      ])
    } else if (projectTheme.id == Themes.REMBRANDT) {
      setThemeImages([
        { id: 1, src: require('../assets/images/themes/rembrandt/self-portrait.jpg') },
        { id: 2, src: require('../assets/images/themes/rembrandt/the-night-watch.jpg') },
        { id: 3, src: require('../assets/images/themes/rembrandt/the-storm.jpg') },
        { id: 4, src: require('../assets/images/themes/rembrandt/winter-landscape.jpg') },
      ])
    } else if (projectTheme.id == Themes.VANGOUGH) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/van-gogh/cafe-terrace-at-night.jpg') },
        { id: 1, src: require('../assets/images/themes/van-gogh/self-portrait.jpg') },
        { id: 2, src: require('../assets/images/themes/van-gogh/starry-night.jpg') },
        { id: 3, src: require('../assets/images/themes/van-gogh/wheat-field.jpg') },
      ])
    } else if (projectTheme.id == Themes.WHISTLER) {
      setThemeImages([
        { id: 0, src: require('../assets/images/themes/whistler/girl-in-white.jpg') },
        { id: 1, src: require('../assets/images/themes/whistler/sunset-red-and-gold.jpg') },
        { id: 2, src: require('../assets/images/themes/whistler/the-balcony.jpg') },
        { id: 3, src: require('../assets/images/themes/whistler/the-gentle-art-of-making-enemies.jpg') },
      ])
    }
  }

  // TODO: submit image for styling
  const handleImagePress = (index) => {
    // console.log('handleImagePress')
    setSelectedStyleIndex(index)
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
            <TouchableHighlight onPress={() => handleImagePress(item.id)}>
              <>
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
                {item.id == selectedStyleIndex && (
                  <View style={styles.checkIcon}>
                    <AntDesign name="checkcircle" size={24} color="white" />
                  </View>
                )}
              </>
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
  checkIcon: {
    // borderWidth: 1,
    // borderColor: 'green',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    position: 'absolute',
    padding: 15,
    right: 0,
    bottom: 0,
    marginLeft: 'auto',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
  },
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
})
