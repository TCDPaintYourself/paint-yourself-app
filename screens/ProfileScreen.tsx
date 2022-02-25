import {
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
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

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Profile'>) {
  const IMGS_PER_ROW = 3
  const GRID_IMG_WIDTH = Dimensions.get('window').width / IMGS_PER_ROW
  const GRID_IMG_HEIGHT = GRID_IMG_WIDTH // square images

  const [user] = useUserContext()

  const [coverPic, setCoverPic] = useState('')
  const [numCreations, setNumCreations] = useState(0)

  // Array holding user's created images
  const [dataSource, setDataSource] = useState<Array<{ id: number; src: string }>>([])

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

  useEffect(() => {
    // load previously saved images from /Paint-Yourself
    const getLocalImages = async () => {
      const mediaPerm = await MediaLibrary.requestPermissionsAsync(false) // check first

      if (!mediaPerm.canAskAgain || mediaPerm.status === 'denied') {
        /**
         *   Code to open device setting then the user can manually grant the app
         *  that permission
         */
        console.log('Denied')
        setPermissionsModalActive(true)
      } else {
        if (mediaPerm.status === 'granted') {
          // Your actually code require this permission
          console.log('Granted')
        }
      }

      // if (status) {
      //   console.log('Have profile permissions')
      // } else {
      //   console.log('Need profile permissions')
      // }
      // const status = await MediaLibrary.requestPermissionsAsync(false)
    }

    getLocalImages()
    // init temp images
    //  TODO: init this array using saved images
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {
        id: i,
        src: `http://placehold.it/${GRID_IMG_WIDTH}x${GRID_IMG_HEIGHT}?text=` + (i + 1),
        // src: `https://picsum.photos/${GRID_IMG_WIDTH}/${GRID_IMG_HEIGHT}`,   // an actual image placeholder
      }
    })
    setDataSource(items)

    // TODO: set from persistent storage
    setCoverPic(require('../assets/images/temp/cover_photo_temp.jpg'))

    // TODO: set from persistent storage
    setNumCreations(60)
  }, [])

  const updateCoverPhoto = () => {
    console.log('Update Cover Photo')
  }

  // expand image selected from grid
  const expandImageView = (id: number) => {
    console.log(`Expand grid image ${id}`)
  }

  if (user) {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={permissionsModalActive}
          onRequestClose={() => {
            console.log('Modal has been closed.')
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
                <Text style={[styles.modalText, { fontWeight: 'bold' }]}> device settings</Text>
                <Text style={styles.modalText}> and grant this permission. </Text>
              </Text>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setPermissionsModalActive(false)}>
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
                size={22}
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
              <Text> Creations </Text>
            </Text>
          </View>
          <View style={styles.creationsContainer}>
            <FlatList
              numColumns={IMGS_PER_ROW}
              data={dataSource}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      margin: 1,
                    }}
                  >
                    <TouchableHighlight onPress={() => expandImageView(item.id)}>
                      <Image
                        style={[
                          styles.imageThumbnail,
                          {
                            width: GRID_IMG_WIDTH - GRID_IMG_WIDTH / 9,
                            height: GRID_IMG_HEIGHT - GRID_IMG_HEIGHT / 9,
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
    // borderBottomWidth: 2,
    borderBottomColor: 'white',
    // borderColor: "green",
    // borderWidth: 1,
    // justifyContent: "center",
  },
  creationsContainer: {
    flex: 1,
    // borderColor: "purple",
    // backgroundColor: '#222831',
    backgroundColor: 'white',
    // borderWidth: 1,
    padding: 10,
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
    // backgroundColor: '#393E46',
    backgroundColor: 'white',
    // borderWidth: 1,
    padding: 5,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 128,
    // width: 128,
  },
  logoutButton: {},
  numStylegans: {
    flex: 37.5,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 8,
    // borderColor: "cyan",
    // borderWidth: 1,
  },
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
  profileHeader: {
    flexDirection: 'row',
    // borderColor: "green",
    // backgroundColor: '#222831',
    backgroundColor: 'white',
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
    backgroundColor: 'white',
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
