import { StyleSheet, Image, Dimensions, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AS_KEYS from 'constants/AsyncStorage'
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

type storageEntry = { [id: string]: string }

const FinishedArtScreen: React.FC<Props> = ({ route, navigation }) => {
  const { image } = route.params

  // when user clicks home too fast after saving, throws an unmounted component error
  //  -> wait til finished saving before reenabling buttons
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [failedPermissionCheck, setfailedPermissionCheck] = useState(false)

  const [creationName, onChangeCreationName] = useState('')

  useEffect(() => {
    const save = async () => {
      try {
        const { status } = await MediaLibrary.getPermissionsAsync()
        const asset = await MediaLibrary.createAssetAsync(image)
        // asset.filename = '@PY-' + new Date().toLocaleTimeString()
        const albumCreated = await MediaLibrary.createAlbumAsync('Paint-Yourself', asset, false)
        console.log(`BEFORE SAVE: `)

        console.log(asset)

        // uri and filename may change when file moves from /DCIM to /Paint-Yourself so need to pull asset back out of album
        // TODO: this probably won't be needed when we get backend hooked up properly
        const albums = await MediaLibrary.getAlbumsAsync()
        let paintYourselfAlbum
        for (const album of albums) {
          if (album.hasOwnProperty('title') && album['title'] == 'Paint-Yourself') {
            paintYourselfAlbum = album
            break
          }
        }

        if (paintYourselfAlbum) {
          const response = await MediaLibrary.getAssetsAsync({
            album: paintYourselfAlbum,
            first: 1,
            mediaType: 'photo',
            sortBy: ['creationTime'],
          })
          const asset = response.assets[0] // most recently saved
          console.log(`AFTER SAVE: `)

          console.log(asset)

          const key = asset.uri
          console.log(`CREATION NAME: ${creationName}`)
          const value =
            creationName.toLowerCase() === 'untitled' || creationName.length === 0
              ? 'Untitled-' + new Date().toLocaleTimeString()
              : creationName
          console.log(`VALUE: ${value}`)

          await storeCreationName(key, value)
        } else {
          console.log("Couldn't find album (?)")
        }

        setSaved(true)
      } catch (e) {
        console.log('Failed Media Library permissions check on save')
        setfailedPermissionCheck(true)
      }

      console.log('done')
      setSaving(false)
    }

    if (saving) {
      save()
    }
  }, [saving])

  const storeCreationName = async (itemKey: string, itemValue: string) => {
    try {
      const storageKey = AS_KEYS.namesKey

      let item = await AsyncStorage.getItem(storageKey)

      if (item) {
        // object exists
        let itemParsed = JSON.parse(item) // parse it
        itemParsed![itemKey] = itemValue // add new item
        const storageEntrySerialised = JSON.stringify(itemParsed) // serialise it
        await AsyncStorage.setItem(storageKey, storageEntrySerialised) // store it

        console.log(itemParsed)
      } else {
        // create storage entry
        let value = {
          [itemKey]: itemValue,
        } as storageEntry
        console.log('VALUE: ')
        console.log(value)

        // serialise it
        const storageEntrySerialised = JSON.stringify(value)

        // store it
        await AsyncStorage.setItem(storageKey, storageEntrySerialised)
      }
    } catch (e) {
      // error
      console.log('Storage error: ' + e)
    }
  }

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
        <Button onPress={handleHome} style={styles.actionButtons} disabled={saving} title="Home" />
      </View>
      <Text style={{ color: 'white' }}>Save your creation to your gallery:</Text>
      <View style={styles.saveContainer}>
        <TextInput
          style={styles.textInput}
          autoCapitalize={'words'}
          onChangeText={onChangeCreationName}
          value={creationName}
          placeholder="Untitled"
          keyboardType="default"
          editable={!saved}
        />
        <Button onPress={saveImage} disabled={saved || failedPermissionCheck} style={styles.saveButton} title="Save" />
      </View>

      <View style={styles.savedText}>
        {saved && <Text>Image saved!</Text>}
        {failedPermissionCheck && <Text>Saving failed - Please enable media permissions</Text>}
      </View>
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
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  row: {
    width: '100%',
    flex: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    paddingBottom: '5%',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  image: {
    marginTop: 60,
    borderWidth: 1,
    borderColor: 'white',
    flex: 4,
    width: containerWidth,
    height: containerWidth,
    marginBottom: 10,
  },
  actionButtons: { alignSelf: 'center', width: '40%' },
  savedText: {
    flex: 0.5,
    marginTop: 10,
  },
  saveContainer: {
    flex: 0.5,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  saveButton: {
    flex: 1,
    borderRadius: 3,
  },
  textInput: {
    flex: 4,
    backgroundColor: 'rgba(255,255,255,1.0)',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 20,
    // width: '60%',
    // width: '200%',
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
})
