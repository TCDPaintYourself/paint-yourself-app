import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
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

  const [themeImages, setThemeImages] = useState<{ id: number; path: string; src: number; theme: Themes }[]>([])
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0)
  const [selectedStyleTheme, setSelectedStyleTheme] = useState(Themes.CARAVAGGIO_SELF_PORTRAIT)
  const [imageModalSrc, setImageModalSrc] = useState(0)
  const [imageModalActive, setImageModalActive] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // set title
    navigation.setOptions({ headerTitle: `Select a '${projectTheme.name}' style:` })

    // set images for this theme
    updateThemeImages()
  }, [])

  const updateThemeImages = () => {
    if (projectTheme.id == Themes.ARTNOUVEAU) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/art-nouveau/klimt_hygieia.jpg',
          src: require('../assets/images/themes/art-nouveau/klimt_hygieia.jpg'),
          theme: Themes.KLIMT_HYGIEIA,
        },
        {
          id: 1,
          path: '../assets/images/themes/art-nouveau/klimt_the-kiss.jpg',
          src: require('../assets/images/themes/art-nouveau/klimt_the-kiss.jpg'),
          theme: Themes.KLIMT_THE_KISS,
        },
        {
          id: 2,
          path: '../assets/images/themes/art-nouveau/mucha_daydream.jpg',
          src: require('../assets/images/themes/art-nouveau/mucha_daydream.jpg'),
          theme: Themes.MUCHA_DAYDREAM,
        },
        {
          id: 3,
          path: '../assets/images/themes/art-nouveau/mucha_la-plume.jpg',
          src: require('../assets/images/themes/art-nouveau/mucha_la-plume.jpg'),
          theme: Themes.MUCHA_LA_PLUME,
        },
      ])
    } else if (projectTheme.id == Themes.CARAVAGGIO) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/caravaggio/penitent-magdelene.jpg',
          src: require('../assets/images/themes/caravaggio/penitent-magdelene.jpg'),
          theme: Themes.PENITENT_MAGDELENE,
        },
        {
          id: 1,
          path: '../assets/images/themes/caravaggio/self-portrait.jpg',
          src: require('../assets/images/themes/caravaggio/self-portrait.jpg'),
          theme: Themes.CARAVAGGIO_SELF_PORTRAIT,
        },
        {
          id: 2,
          path: '../assets/images/themes/caravaggio/the-crowning-with-thorns.jpg',
          src: require('../assets/images/themes/caravaggio/the-crowning-with-thorns.jpg'),
          theme: Themes.THE_CROWNING_WITH_THORNS,
        },
        {
          id: 3,
          path: '../assets/images/themes/caravaggio/the-entombment-of-christ.jpg',
          src: require('../assets/images/themes/caravaggio/the-entombment-of-christ.jpg'),
          theme: Themes.THE_ENTOMBMENT_OF_CHRIST,
        },
      ])
    } else if (projectTheme.id == Themes.CLAUDEMONET) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/claude-monet/arm-of-the-seine.jpg',
          src: require('../assets/images/themes/claude-monet/arm-of-the-seine.jpg'),
          theme: Themes.ARM_OF_THE_SEINE,
        },
        {
          id: 1,
          path: '../assets/images/themes/claude-monet/garden-at-giverny.jpg',
          src: require('../assets/images/themes/claude-monet/garden-at-giverny.jpg'),
          theme: Themes.GARDEN_AT_GIVERNY,
        },
        {
          id: 2,
          path: '../assets/images/themes/claude-monet/water-lillies.jpg',
          src: require('../assets/images/themes/claude-monet/water-lillies.jpg'),
          theme: Themes.WATER_LILLIES,
        },
        {
          id: 3,
          path: '../assets/images/themes/claude-monet/woman-with-a-parasol.jpg',
          src: require('../assets/images/themes/claude-monet/woman-with-a-parasol.jpg'),
          theme: Themes.WOMAN_WITH_A_PARASOL,
        },
      ])
    } else if (projectTheme.id == Themes.DAVINCI) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/da-vinci/mona-lisa.jpg',
          src: require('../assets/images/themes/da-vinci/mona-lisa.jpg'),
          theme: Themes.MONA_LISA,
        },
        {
          id: 1,
          path: '../assets/images/themes/da-vinci/tobias-and-the-angel.jpg',
          src: require('../assets/images/themes/da-vinci/tobias-and-the-angel.jpg'),
          theme: Themes.TOBIAS_AND_THE_ANGEL,
        },
        {
          id: 2,
          path: '../assets/images/themes/da-vinci/virgin-of-the-rocks.jpg',
          src: require('../assets/images/themes/da-vinci/virgin-of-the-rocks.jpg'),
          theme: Themes.VIRGIN_OF_THE_ROCKS,
        },
        {
          id: 3,
          path: '../assets/images/themes/da-vinci/vitruvian-man.jpg',
          src: require('../assets/images/themes/da-vinci/vitruvian-man.jpg'),
          theme: Themes.VITRUVIAN_MAN,
        },
      ])
    } else if (projectTheme.id == Themes.EXPRESSIONISM) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/expressionism/betzler_reclining-couple.jpg',
          src: require('../assets/images/themes/expressionism/betzler_reclining-couple.jpg'),
          theme: Themes.BETZLER_RECLINING_COUPLE,
        },
        {
          id: 1,
          path: '../assets/images/themes/expressionism/kirchner_sertigtal-in-autumn.jpg',
          src: require('../assets/images/themes/expressionism/kirchner_sertigtal-in-autumn.jpg'),
          theme: Themes.KIRCHNER_SERTIGTAL_IN_AUTUMN,
        },
        {
          id: 2,
          path: '../assets/images/themes/expressionism/munch_the-scream.jpg',
          src: require('../assets/images/themes/expressionism/munch_the-scream.jpg'),
          theme: Themes.MUNCH_THE_SCREAM,
        },
        {
          id: 3,
          path: '../assets/images/themes/expressionism/pechstein_leba-harbour.jpg',
          src: require('../assets/images/themes/expressionism/pechstein_leba-harbour.jpg'),
          theme: Themes.PECHSTEIN_LEBA_HARBOUR,
        },
        {
          id: 4,
          path: '../assets/images/themes/expressionism/roestenburg_eifel-summer.jpg',
          src: require('../assets/images/themes/expressionism/roestenburg_eifel-summer.jpg'),
          theme: Themes.ROESTENBURG_EIFEL_SUMMER,
        },
      ])
    } else if (projectTheme.id == Themes.IMPRESSIONISM) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/impressionism/afremov_sleeping-city.jpeg',
          src: require('../assets/images/themes/impressionism/afremov_sleeping-city.jpeg'),
          theme: Themes.AFREMOV_SLEEPING_CITY,
        },
        {
          id: 1,
          path: '../assets/images/themes/impressionism/pissarro_miribeau-garden.jpg',
          src: require('../assets/images/themes/impressionism/pissarro_miribeau-garden.jpg'),
          theme: Themes.PISSARRO_MIRIBEAU_GARDEN,
        },
        {
          id: 2,
          path: '../assets/images/themes/impressionism/renoir_girls-at-the-piano.jpg',
          src: require('../assets/images/themes/impressionism/renoir_girls-at-the-piano.jpg'),
          theme: Themes.RENOIR_GIRLS_AT_THE_PIANO,
        },
        {
          id: 3,
          path: '../assets/images/themes/impressionism/sargent_in-a-levantine-port.jpg',
          src: require('../assets/images/themes/impressionism/sargent_in-a-levantine-port.jpg'),
          theme: Themes.SARGENT_IN_A_LEVANTINE_PORT,
        },
      ])
    } else if (projectTheme.id == Themes.PICASSO) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/picasso/girl-before-a-mirror.jpg',
          src: require('../assets/images/themes/picasso/girl-before-a-mirror.jpg'),
          theme: Themes.GIRL_BEFORE_A_MIRROR,
        },
        {
          id: 1,
          path: '../assets/images/themes/picasso/girl-with-a-mandolin.jpg',
          src: require('../assets/images/themes/picasso/girl-with-a-mandolin.jpg'),
          theme: Themes.GIRL_WITH_A_MANDOLIN,
        },
        {
          id: 2,
          path: '../assets/images/themes/picasso/les-femmes-dalgiers.jpg',
          src: require('../assets/images/themes/picasso/les-femmes-dalgiers.jpg'),
          theme: Themes.LES_FEMMES_DALGIERS,
        },
        {
          id: 3,
          path: '../assets/images/themes/picasso/the-weeping-woman.jpg',
          src: require('../assets/images/themes/picasso/the-weeping-woman.jpg'),
          theme: Themes.THE_WEEPING_WOMAN,
        },
      ])
    } else if (projectTheme.id == Themes.POPART) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/pop-art/hamilton_fashion-plate.jpg',
          src: require('../assets/images/themes/pop-art/hamilton_fashion-plate.jpg'),
          theme: Themes.HAMILTON_FASHION_PLATE,
        },
        {
          id: 1,
          path: '../assets/images/themes/pop-art/rauschenberg_retroactive.jpg',
          src: require('../assets/images/themes/pop-art/rauschenberg_retroactive.jpg'),
          theme: Themes.RAUSCHENBERG_RETROACTIVE,
        },
        {
          id: 2,
          path: '../assets/images/themes/pop-art/wain_kaleidoscope-cat.jpg',
          src: require('../assets/images/themes/pop-art/wain_kaleidoscope-cat.jpg'),
          theme: Themes.WAIN_KALEIDOSCOPE_CAT,
        },
        {
          id: 3,
          path: '../assets/images/themes/pop-art/warhol_marilyn.jpg',
          src: require('../assets/images/themes/pop-art/warhol_marilyn.jpg'),
          theme: Themes.WARHOL_MARILYN,
        },
      ])
    } else if (projectTheme.id == Themes.REMBRANDT) {
      setThemeImages([
        {
          id: 1,
          path: '../assets/images/themes/rembrandt/self-portrait.jpg',
          src: require('../assets/images/themes/rembrandt/self-portrait.jpg'),
          theme: Themes.REMBRANDT_SELF_PORTRAIT,
        },
        {
          id: 2,
          path: '../assets/images/themes/rembrandt/the-night-watch.jpg',
          src: require('../assets/images/themes/rembrandt/the-night-watch.jpg'),
          theme: Themes.THE_NIGHT_WATCH,
        },
        {
          id: 3,
          path: '../assets/images/themes/rembrandt/the-storm.jpg',
          src: require('../assets/images/themes/rembrandt/the-storm.jpg'),
          theme: Themes.THE_STORM,
        },
        {
          id: 4,
          path: '../assets/images/themes/rembrandt/winter-landscape.jpg',
          src: require('../assets/images/themes/rembrandt/winter-landscape.jpg'),
          theme: Themes.WINTER_LANDSCAPE,
        },
      ])
    } else if (projectTheme.id == Themes.VANGOUGH) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/van-gogh/cafe-terrace-at-night.jpg',
          src: require('../assets/images/themes/van-gogh/cafe-terrace-at-night.jpg'),
          theme: Themes.CAFE_TERRACE_AT_NIGHT,
        },
        {
          id: 1,
          path: '../assets/images/themes/van-gogh/self-portrait.jpg',
          src: require('../assets/images/themes/van-gogh/self-portrait.jpg'),
          theme: Themes.VAN_GOGH_SELF_PORTRAIT,
        },
        {
          id: 2,
          path: '../assets/images/themes/van-gogh/starry-night.jpg',
          src: require('../assets/images/themes/van-gogh/starry-night.jpg'),
          theme: Themes.STARRY_NIGHT,
        },
        {
          id: 3,
          path: '../assets/images/themes/van-gogh/wheat-field.jpg',
          src: require('../assets/images/themes/van-gogh/wheat-field.jpg'),
          theme: Themes.WHEAT_FIELD,
        },
      ])
    } else if (projectTheme.id == Themes.WHISTLER) {
      setThemeImages([
        {
          id: 0,
          path: '../assets/images/themes/whistler/girl-in-white.jpg',
          src: require('../assets/images/themes/whistler/girl-in-white.jpg'),
          theme: Themes.GIRL_IN_WHITE,
        },
        {
          id: 1,
          path: '../assets/images/themes/whistler/sunset-red-and-gold.jpg',
          src: require('../assets/images/themes/whistler/sunset-red-and-gold.jpg'),
          theme: Themes.SUNSET_RED_AND_GOLD,
        },
        {
          id: 2,
          path: '../assets/images/themes/whistler/the-balcony.jpg',
          src: require('../assets/images/themes/whistler/the-balcony.jpg'),
          theme: Themes.THE_BALCONY,
        },
        {
          id: 3,
          path: '../assets/images/themes/whistler/the-gentle-art-of-making-enemies.jpg',
          src: require('../assets/images/themes/whistler/the-gentle-art-of-making-enemies.jpg'),
          theme: Themes.THE_GENTLE_ART_OF_MAKING_ENEMIES,
        },
      ])
    }
  }

  const handleImagePress = (index: number, src: number, theme: Themes) => {
    setSelectedStyleIndex(index)
    setSelectedStyleTheme(theme)
  }

  const handleImageLongPress = (index: number, src: number) => {
    setImageModalSrc(src)
    setImageModalActive(true)
  }

  const handleContinue = async () => {
    const filename = inputImage.split('/').pop()

    const filetype = filename?.split('.').pop()

    setLoading(true)

    const authToken = await user?.getIdToken()

    const formData = new FormData()
    // Any type as react-native as a custom FormData implementation.
    formData.append('input_image', { uri: inputImage, name: filename, type: `image/${filetype}` } as any)

    let response = null
    try {
      response = await fetch(
        `http://paint-yourself.uksouth.cloudapp.azure.com:8080/styled-images?theme=${selectedStyleTheme}`, // omit project theme
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
      setLoading(false)
      console.log(error)
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

    setLoading(false)

    navigation.navigate('FinishedArtScreen', { image: imageUri, theme: projectTheme.id })
  }

  return (
    <View style={styles.container}>
      {/* Expanded style modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalActive}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.')
          setImageModalActive(!imageModalActive)
        }}
      >
        <TouchableWithoutFeedback onPress={() => setImageModalActive(false)}>
          <View style={styles.modalBackground}>
            <Image
              source={imageModalSrc}
              resizeMode="contain"
              style={{ flex: 1, width: '100%', height: undefined }}
            ></Image>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Loading modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          // shouldn't be able to manually close
        }}
      >
        <View style={styles.modalBackground}>
          {/* <AntDesign name="loading1" size={24} color="white" /> */}
          <ActivityIndicator size="large" color="#fffff" />
          <Text>Loading your Creation</Text>
        </View>
      </Modal>
      <Text style={{ textAlign: 'left', paddingTop: 10, paddingLeft: 10 }}>Long press to view expanded style</Text>
      <View style={styles.scrollViewContainer}>
        <FlatList
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={themeImages}
          columnWrapperStyle={{ flex: 1, justifyContent: 'center', paddingTop: 10 }}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              onPress={() => handleImagePress(item.id, item.src, item.theme)}
              onLongPress={() => handleImageLongPress(item.id, item.src)}
            >
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
                    borderRadius: 4,
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
      <View style={{ alignItems: 'center' }}>
        <Button title="Continue" onPress={handleContinue} style={{ marginBottom: 20, width: '90%' }} />
      </View>
    </View>
  )
}

export default StyleFolderModal

const styles = StyleSheet.create({
  checkIcon: {
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
    // borderWidth: 1,
    // borderColor: 'green',
  },
  modalBackground: {
    flex: 1,
    // position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'yellow',
    padding: '3%',
  },
  modalContent: {},
  scrollViewContainer: {
    flex: 1,
    height: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
})
