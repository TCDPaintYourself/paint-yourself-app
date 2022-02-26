import { StyleSheet, Image, Dimensions } from 'react-native'
import { Text, View } from 'components/Themed'
import Button from 'components/Button'
import * as Sharing from 'expo-sharing'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as MediaLibrary from 'expo-media-library'
import { useState, useEffect } from 'react'

const { width, height } = Dimensions.get('screen')
const containerWidth = width * 0.8

type RootStackParamList = {
  FinishedArtScreen: { image: string }
  Profile: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'FinishedArtScreen'>

const FinishedArtScreen: React.FC<Props> = ({ route, navigation }) => {
  const { image } = route.params

  // when user clicks home too fast after saving, throws an unmounted component error
  //  -> wait til finished saving before reenabling buttons
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const save = async () => {
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
      setSaving(false)
    }

    if (saving) {
      save()
    }
  }, [saving])

  const shareImage = async () => {
    if (await Sharing.isAvailableAsync()) {
      Sharing.shareAsync(image)
    }
  }

  const saveImage = async () => {
    setSaving(true)
  }

  const handleHome = () => navigation.navigate('Profile')

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.row}>
        <Button onPress={shareImage} style={styles.actionButtons} disabled={saving} title="Share" />
        <Button onPress={saveImage} style={styles.actionButtons} disabled={saved} title="Save" />
        <Button onPress={handleHome} style={styles.actionButtons} disabled={saving} title="Home" />
      </View>

      <View style={styles.savedText}>{saved && <Text>Image saved!</Text>}</View>
    </View>
  )
}

export default FinishedArtScreen

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
    justifyContent: 'space-around',
  },
  image: {
    marginTop: 60,
    borderWidth: 1,
    borderColor: 'white',
    flex: 3,
    width: containerWidth,
    height: containerWidth,
    marginBottom: 10,
  },
  actionButtons: { alignSelf: 'center', width: containerWidth / 2 - 50, marginTop: 20 },
  savedText: {
    flex: 0.5,
    marginTop: 10,
  },
})
