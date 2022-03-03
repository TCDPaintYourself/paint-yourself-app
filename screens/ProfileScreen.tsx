import {
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableHighlight,
  ImageSourcePropType,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'components/Themed' // need view
import { RootTabScreenProps } from 'types'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserContext } from 'hooks/useUserContext'
import { auth } from 'utils/firebase'
import * as MediaLibrary from 'expo-media-library'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AS_KEYS from 'constants/AsyncStorage'

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Profile'>) {
  const IMGS_PER_ROW = 3
  const GRID_IMG_WIDTH = (Dimensions.get('window').width * 0.95) / IMGS_PER_ROW
  const GRID_IMG_HEIGHT = GRID_IMG_WIDTH // square images
  let creations = []

  const [user] = useUserContext()

  const [coverPic, setCoverPic] = useState('')

  const [albumID, setAlbumID] = useState('')
  const [numCreations, setNumCreations] = useState(0)
  const [refreshingCreations, setRefreshingCreations] = useState(false)

  // Array holding user's created images
  const [dataSource, setDataSource] = useState<Array<{ id: number; src: string; name: string }>>([])

  const [permissionsModalActive, setPermissionsModalActive] = useState(false)

  /**
   * Logs the user out.
   */
  const onPressLogout = () => auth.signOut()

  /**
   * Return to the login screen.
   */
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return
    }

    navigation.navigate('LoginRegister')
  })

  const updateCreationsList = async () => {
    // don't proceed unless we have permissions
    const mediaPerm = await MediaLibrary.requestPermissionsAsync(false)

    if (!mediaPerm.canAskAgain || mediaPerm.status === 'denied') {
      console.log('Denied')
      setPermissionsModalActive(true)
    } else if (mediaPerm.status === 'granted') {
      console.log('Granted')

      if (albumID) {
        // fetch the assets from the library
        const pagedAssets = await MediaLibrary.getAssetsAsync({
          album: albumID,
          first: numCreations,
          mediaType: 'photo',
          sortBy: ['creationTime'],
        })
        const assets = pagedAssets.assets
        console.log(assets)

        creations = assets.map((asset, i) => {
          return {
            id: i,
            src: asset.uri,
            name: '[Untitled]',
          }
        })

        // append names
        await fetchCreationNames(creations)

        setDataSource(creations)
      } else {
        console.log(`Error with album id : ${albumID}`)
      }
    }

    setRefreshingCreations(false)
  }

  const fetchCreationNames = async (creations: { id: number; src: string; name: string }[]) => {
    const namesKey = AS_KEYS.namesKey

    try {
      // {... uri: creationName ...}
      const uriNamePairs = await AsyncStorage.getItem(namesKey)

      console.log(uriNamePairs)

      if (uriNamePairs) {
        const uriNamePairsParsed = JSON.parse(uriNamePairs)

        let match = null
        for (const uriKey in uriNamePairsParsed) {
          match = creations.find((o) => o.src === uriKey)

          if (match) {
            console.log('MATCH: ')
            console.log(match)

            match.name = uriNamePairsParsed[uriKey]
            console.log(match)
          }
        }
      }
    } catch (e) {
      console.log('Error fetching creation names:\n ' + e)
    }
  }

  const refreshNumCreations = async () => {
    const mediaPerm = await MediaLibrary.requestPermissionsAsync(false) // check first

    if (!mediaPerm.canAskAgain || mediaPerm.status === 'denied') {
      console.log('Denied')
      setPermissionsModalActive(true)
      setRefreshingCreations(false)
    } else if (mediaPerm.status === 'granted') {
      console.log('Granted')

      const albums = await MediaLibrary.getAlbumsAsync()

      let paintYourselfAlbum = null
      for (const album of albums) {
        if (album.hasOwnProperty('title') && album['title'] == 'Paint-Yourself') {
          paintYourselfAlbum = album
          break
        }
      }

      if (paintYourselfAlbum) {
        setAlbumID(paintYourselfAlbum.id)

        console.log(`N ASSETS: ${paintYourselfAlbum.assetCount}`)
        if (paintYourselfAlbum.assetCount === numCreations) {
          setRefreshingCreations(false)
        } else {
          setNumCreations(paintYourselfAlbum.assetCount)
        }
      } else {
        console.log('No Paint-Yourself album found')
        setNumCreations(0)
        setRefreshingCreations(false)
      }
    } else {
      console.log('Unexpected error with permissions')
      setRefreshingCreations(false)
      setNumCreations(0)
    }
  }

  // if numCreations changes, means user saved a new creation -> reload creations
  useEffect(() => {
    updateCreationsList()
  }, [numCreations])

  useEffect(() => {
    refreshNumCreations()

    // TODO: set from persistent storage
    setCoverPic(require('../assets/images/temp/cover_photo_temp.jpg'))
  }, [])

  const updateCoverPhoto = () => {
    console.log('Update Cover Photo')
  }

  // expand image selected from grid
  const expandImageView = (filepath: string, creationName: string) => {
    navigation.navigate('ExpandedImageModal', { name: creationName, filepath: filepath } as never)
  }

  if (user) {
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={permissionsModalActive}
          onRequestClose={() => {
            setPermissionsModalActive(false)
          }}
          style={styles.modal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                <Text style={[styles.modalText, { fontWeight: 'bold' }]}>Paint Yourself</Text>
                <Text style={styles.modalText}> needs access to your </Text>
                <Text style={[styles.modalText, { fontWeight: 'bold' }]}>Media Library</Text>
                <Text style={styles.modalText}> to load your previously saved creations! </Text>
              </Text>
              <Text style={styles.modalText}>
                Please go to your
                <Text style={[styles.modalText, { fontWeight: 'bold' }]}> Device Settings</Text>
                <Text style={styles.modalText}> to grant this permission. </Text>
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                  setPermissionsModalActive(false)
                }}
              >
                <Text style={styles.textStyle}>Okay!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.coverRegion}>
          <ImageBackground
            resizeMode="cover"
            source={coverPic ? (coverPic as ImageSourcePropType) : { uri: null }}
            style={styles.coverImage}
          >
            <View style={styles.IconButtonContainer}>
              <MaterialCommunityIcons
                name="logout-variant"
                size={20}
                color="black"
                onPress={onPressLogout}
                style={styles.logoutButton}
                title="Logout"
                accessibilityLabel="Logs the user out"
              />
            </View>
            <View style={styles.IconButtonContainer}>
              <FontAwesome5
                name="images"
                size={20}
                color="black"
                onPress={updateCoverPhoto}
                style={styles.updateCoverPhotoButton}
                title="Update Cover Photo"
                accessibilityLabel="Updates the user's cover photo"
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.content}>
          <View style={styles.profileHeader}>
            <Text style={styles.googleName} numberOfLines={1}>
              {user.displayName}
            </Text>
            <View style={styles.profileImgContainer}>
              <Image source={{ uri: user.photoURL! }} resizeMode="cover" style={styles.profileImg} />
            </View>
            <Text style={styles.numStylegans} numberOfLines={1}>
              <Text style={{ fontWeight: 'bold' }}> {numCreations} </Text>
              <Text> {numCreations === 1 ? 'Creation' : 'Creations'} </Text>
            </Text>
          </View>
          <View style={styles.creationsContainer}>
            {numCreations > 0 && (
              <FlatList
                columnWrapperStyle={{ flex: 1, justifyContent: 'flex-start' }}
                numColumns={IMGS_PER_ROW}
                data={dataSource}
                refreshControl={
                  <RefreshControl
                    enabled={numCreations > 0}
                    refreshing={refreshingCreations}
                    onRefresh={() => {
                      setRefreshingCreations(true)
                      console.log('Refresh')
                      refreshNumCreations()
                    }}
                  />
                }
                ListHeaderComponent={() => {
                  return (
                    <View style={{ backgroundColor: '#30363d', paddingBottom: 6, paddingRight: 6 }}>
                      <Text style={{ textAlign: 'right', color: 'rgba(255,255,255,0.7)' }}>Pull to refresh</Text>
                    </View>
                  )
                }}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        // flex: 1,
                        flexDirection: 'column',
                        margin: 1,
                      }}
                    >
                      <TouchableHighlight onPress={() => expandImageView(item.src, item.name)}>
                        <Image
                          style={[
                            styles.imageThumbnail,
                            {
                              width: GRID_IMG_WIDTH,
                              height: GRID_IMG_HEIGHT,
                            },
                          ]}
                          source={{
                            uri: item.src,
                          }}
                        />
                      </TouchableHighlight>
                    </View>
                  )
                }}
                keyExtractor={(item, index) => '' + item.id}
                contentContainerStyle={styles.grid}
                initialNumToRender={12}
              ></FlatList>
            )}
            {numCreations < 1 && (
              // Can only pull to refresh on scrollable containers
              <ScrollView
                contentContainerStyle={styles.noCreationsContainer}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshingCreations}
                    onRefresh={() => {
                      console.log('scrollview refreshing')

                      setRefreshingCreations(true)
                      refreshNumCreations()
                    }}
                  />
                }
              >
                <View style={styles.noCreationsIconContainer}>
                  <FontAwesome5 name="sad-cry" size={64} color="rgba(0, 0, 0, 0.3)" />
                </View>
                <View
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    // borderWidth: 1,
                    // borderColor: 'blue',
                    flex: 1,
                  }}
                >
                  <Text style={{ color: 'black', flex: 1, textAlign: 'center' }}>No Saved Creations Found!</Text>
                  <Text style={{ color: 'black', flex: 1, textAlign: 'center' }}>
                    Tap <Text style={{ fontWeight: 'bold', color: 'black' }}>'New Project'</Text> below to get started
                    or <Text style={{ fontWeight: 'bold', color: 'black' }}>pull to refresh</Text>.
                  </Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>No user logged in</Text>
      </View>
    )
  }
}

// palette: https://colorhunt.co/palette/222831393e46b55400eeeeee
const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  center: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: "red",
    // borderWidth: 1,
  },
  content: {
    flex: 4,
    width: '100%',
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  coverImage: {
    flex: 1,
    width: '100%',
    // flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  coverRegion: {
    flex: 1,
    width: '100%',
    borderBottomColor: 'white',
  },
  creationsContainer: {
    flex: 1,
    borderWidth: 1,
    // padding: 10,
    marginTop: 10,
  },
  googleName: {
    flex: 37.5,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 8,
    // borderColor: "cyan",
    // borderWidth: 1,
  },
  grid: {
    // borderColor: "cyan",
    backgroundColor: '#30363d',
    // backgroundColor: 'white',
    borderWidth: 5,
    borderColor: '#30363d',
    // borderWidth: 1,
    // padding: '1%',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    // height: 128,
    // width: 128,
  },
  logoutButton: {},
  modal: {
    backgroundColor: 'red',
  },
  modalText: {
    marginBottom: 15,
    color: 'black',
    textAlign: 'justify',
  },
  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  noCreationsContainer: {
    flex: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    backgroundColor: 'white',
    borderWidth: 1,
    paddingVertical: '30%',
  },
  noCreationsIconContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '70%',
  },
  numStylegans: {
    flex: 37.5,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 8,
    color: 'black',
    // borderColor: "cyan",
    // borderWidth: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    // borderColor: "green",
    // backgroundColor: '#222831',
    // backgroundColor: 'white',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 2,
    borderBottomColor: '#393E46',
    // borderBottomWidth: 1,
  },
  profileImg: {
    width: 80,
    height: 80,
    marginTop: -(80 / 2), // 1/2 height
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImgContainer: {
    // backgroundColor: '#222831',
    // backgroundColor: 'white',
    flex: 25,
    alignItems: 'center',
    // borderColor: "red",
    // borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  updateCoverPhotoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    color: 'rgba(0, 0, 0, 0.75)',
    // borderColor: "orange",
    // borderWidth: 1,
    marginTop: 1,
  },
  IconButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    // borderColor: "orange",
    // borderWidth: 1,
    // marginBottom: '2%',
    // marginRight: '2%',
    margin: '2%',
    paddingTop: 5,
    padding: 4,
    borderRadius: 5,
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
})
