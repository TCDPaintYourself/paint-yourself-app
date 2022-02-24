import React, { useState } from 'react'
import { StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { Text, View, Icon } from 'components/Themed'
import Button from 'components/Button'
import * as Sharing from 'expo-sharing'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

const { width, height } = Dimensions.get('screen')
const containerWidth = width * 0.8
const placeholderImageWidth = width * 0.85
const placeholderImageHeight = placeholderImageWidth * (16 / 9) //make the image a 8x10 portrait

type RootStackParamList = {
  FinishedArtScreen: { image: string }
  Profile: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'FinishedArtScreen'>

const ICON_SIZE = 40

export default function FinishedArtScreen({ route, navigation }: Props) {
  const [upvoted, setUpvote] = useState<boolean | null>()
  const { image } = route.params

  const shareImage = async () => {
    if (await Sharing.isAvailableAsync()) {
      Sharing.shareAsync(image)
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
      <ImageBackground source={{ uri: image }} style={styles.image} imageStyle={{ borderRadius: 16 }}>
        <View style={styles.buttonContainer}>
          <Icon
            name={upvoted ? 'thumbs-up' : 'thumbs-o-up'}
            onPress={handleUpvote}
            size={ICON_SIZE}
            style={styles.iconButton}
          />
          <Icon
            name={upvoted === false ? 'thumbs-down' : 'thumbs-o-down'}
            onPress={handleDownvote}
            size={ICON_SIZE}
            style={styles.iconButton}
          />
        </View>
      </ImageBackground>
      <View style={styles.row}>
        <Button onPress={shareImage} style={styles.shareButton} title="Share" />
        <Button onPress={handleHome} style={styles.shareButton} title="Home" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: placeholderImageWidth,
    height: placeholderImageHeight,
    marginVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
    top: placeholderImageHeight - 60,
    marginBottom: 25,
    backgroundColor: 'transparent',
  },
  iconButton: {
    marginHorizontal: 16,
  },
  shareButton: { alignSelf: 'center', width: containerWidth / 2 - 20, marginTop: 20, marginHorizontal: 10 },
})
