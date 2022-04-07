import React, { useState, useEffect } from 'react'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet, Image, Dimensions, TextInput } from 'react-native'

import AS_KEYS from 'constants/AsyncStorage'
import { Text, View } from 'components/Themed'
import Button from 'components/Button'
import Colors from 'constants/Colors'
import { downvoteTheme, getThemesVote, getThemeVote, upvoteTheme } from 'utils/themeVotes'
import { Themes } from 'constants/ProjectThemes'

const { width } = Dimensions.get('screen')
const containerWidth = width * 0.8
const placeholderImageWidth = width * 0.85
const placeholderImageHeight = placeholderImageWidth * (16 / 9) //make the image a 8x10 portrait

type RootStackParamList = {
  FinishedArtScreen: { image: string; theme: Themes }
  Profile: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'FinishedArtScreen'>

const ICON_SIZE = 32

type storageEntry = { [id: string]: string }

export default function FinishedArtScreen({ route, navigation }: Props) {
  const { image, theme } = route.params
  const [upvoted, setUpvote] = useState<boolean | null>()

  // when user clicks home too fast after saving, throws an unmounted component error
  //  -> wait til finished saving before reenabling buttons
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [failedPermissionCheck, setfailedPermissionCheck] = useState(false)

  const [creationName, onChangeCreationName] = useState('')

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault()
      }),
    []
  )

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
        console.log({ e })
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

  const handleUpvote = () => {
    setUpvote((uv) => (uv ? null : true))
    upvoteTheme(theme)
  }

  const handleDownvote = () => {
    setUpvote((uv) => (uv === false ? null : false))
    downvoteTheme(theme)
  }

  const upvote = async () => {
    let v = await upvoteTheme('test')
    console.log('upvoted!')
    console.log(v)
  }

  const downvote = async () => {
    let v = await downvoteTheme('test')
    console.log('downvoted!')
    console.log(v)
  }

  const getVotes = async () => {
    let votes = await getThemesVote()
    console.log(votes)
  }

  const getVote = async () => {
    let votes = await getThemeVote('test')
    console.log(votes)
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.row}>
        <Button onPress={upvote} style={styles.actionButtons} title="up" />
        <Button onPress={downvote} style={styles.actionButtons} title="down" />
        <Button onPress={getVotes} style={styles.actionButtons} title="all votes" />
        <Button onPress={getVote} style={styles.actionButtons} title="votes" />
      </View>
    </View>
  )
}

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
    justifyContent: 'space-evenly',
  },
  image: {
    marginTop: 60,
    borderWidth: 1,
    borderColor: 'white',
    flex: 4,
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
  actionButtons: { alignSelf: 'center', width: '35%' },
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
