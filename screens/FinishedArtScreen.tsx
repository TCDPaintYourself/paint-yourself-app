import React, { useState } from 'react'
import { StyleSheet, Image, Dimensions } from 'react-native'
import { Text, View, Icon } from 'components/Themed'
import Button from 'components/Button'
import * as Sharing from 'expo-sharing'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as MediaLibrary from 'expo-media-library'
import Colors from 'constants/Colors'
import { FontAwesome } from '@expo/vector-icons'

const { width, height } = Dimensions.get('screen')
const containerWidth = width * 0.8
const placeholderImageWidth = width * 0.85
const placeholderImageHeight = placeholderImageWidth * (16 / 9) //make the image a 8x10 portrait

type RootStackParamList = {
  FinishedArtScreen: { image: string }
  Profile: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'FinishedArtScreen'>

const ICON_SIZE = 32

export default function FinishedArtScreen({ route, navigation }: Props) {
  const [upvoted, setUpvote] = useState<boolean | null>()
  const { image } = route.params
  const [saved, setSaved] = useState(false)

  const shareImage = async () => {
    if (await Sharing.isAvailableAsync()) {
      Sharing.shareAsync(image)
    }
  }

  const saveImage = async () => {
    if (!saved) {
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status) {
        const asset = await MediaLibrary.createAssetAsync(image)
        // asset.filename = '@PY-' + new Date().toLocaleTimeString()
        const albumCreated = await MediaLibrary.createAlbumAsync('Paint-Yourself', asset, false)
        setSaved(true)
      } else {
        console.log('Permissions denied')
      }
      console.log('done')
    }
  }

  const handleHome = () => navigation.navigate('Profile')

  const handleUpvote = () => {
    setUpvote((uv) => (uv ? null : true))
  }

  const handleDownvote = () => {
    setUpvote((uv) => (uv === false ? null : false))
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <FontAwesome name="save" onPress={saveImage} size={ICON_SIZE} style={styles.feedbackIconButton} />
        <FontAwesome
          name={upvoted ? 'thumbs-up' : 'thumbs-o-up'}
          style={[styles.feedbackIconButton, { marginLeft: 'auto' }]}
          onPress={handleUpvote}
          size={ICON_SIZE}
        />
        <FontAwesome
          name={upvoted === false ? 'thumbs-down' : 'thumbs-o-down'}
          onPress={handleDownvote}
          size={ICON_SIZE}
          style={styles.feedbackIconButton}
        />
      </View>

      <View style={styles.row}>
        <Button onPress={shareImage} style={styles.actionButtons} title="Share" />
        <Button onPress={handleHome} style={styles.actionButtons} title="Home" />
      </View>

      <View style={styles.savedText}>{saved && <Text>Image saved!</Text>}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: '100%',
    flex: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  image: {
    marginTop: 60,
    flex: 3,
    width: containerWidth,
    height: containerWidth,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.primary.background,
    width: containerWidth,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    height: 54,
    padding: 2,
  },
  feedbackIconButton: {
    backgroundColor: 'transparent',
    marginHorizontal: 12,
    color: 'white',
  },
  actionButtons: { alignSelf: 'center', width: containerWidth / 2 - 50, marginTop: 20 },
  savedText: {
    flex: 0.5,
    marginTop: 10,
  },
})
