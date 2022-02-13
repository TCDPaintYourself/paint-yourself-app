import React, { useEffect } from 'react'
import { StyleSheet, Image, ImageBackground } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { maybeCompleteAuthSession } from 'expo-web-browser'
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from 'firebase/auth'

import { Text, View } from 'components/Themed'
import { RootTabScreenProps } from 'types'

// Allow user login on web browsers and expo go.
maybeCompleteAuthSession()

export default function LoginRegisterScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const auth = getAuth()
  const [_request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: '486967078951-4q4olam5pvh8p8do8goonmh1udglh6gg.apps.googleusercontent.com',
  })

  // Select random background image.
  const BG_IMAGES = [
    require('../assets/images/auth_bgs/auth_background_1.jpg'),
    require('../assets/images/auth_bgs/auth_background_2.jpg'),
    require('../assets/images/auth_bgs/auth_background_3.jpg'),
    require('../assets/images/auth_bgs/auth_background_4.jpg'),
    require('../assets/images/auth_bgs/auth_background_5.jpg'),
    require('../assets/images/auth_bgs/auth_background_6.jpg'),
    require('../assets/images/auth_bgs/auth_background_7.jpg'),
    require('../assets/images/auth_bgs/auth_background_8.jpg'),
  ]
  const bgImageIndex = Math.floor(Math.random() * (BG_IMAGES.length - 1)) + 1

  /**
   * Google auth event handler.
   */
  const onPressGoogleLogin = () => promptAsync()

  /**
   * Sign into firebase using Google OAuth.
   */
  useEffect(() => {
    if (response?.type !== 'success') {
      return
    }

    const { id_token } = response.params
    const credential = GoogleAuthProvider.credential(id_token)
    signInWithCredential(auth, credential)
  }, [response])

  /**
   * Navigate to the root page on user login.
   */
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      return
    }

    navigation.navigate('Root')
  })

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode="cover" source={BG_IMAGES[bgImageIndex]} style={styles.bgImage}>
        <Image source={require('../assets/images/logo_dark_sh.png')} resizeMode="contain" style={styles.logo} />
        <Text style={styles.title}>Continue with Google:</Text>
        <FontAwesome.Button
          name="google"
          backgroundColor="#FFFFFF"
          color="#757575"
          onPress={onPressGoogleLogin}
          iconStyle={{ marginRight: '15%' }}
          size={25}
          style={styles.google}
        >
          Login with Google
        </FontAwesome.Button>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: 'red',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    // borderColor: "green",
    backgroundColor: 'black',
  },
  google: {
    textAlign: 'center',
    borderWidth: 1,
    // borderColor: "red",
  },
  logo: {
    // flex: 1,
    alignItems: 'center',
    marginLeft: 10,
    // borderWidth: 1,
    borderColor: 'green',
    width: '85%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    // borderWidth: 1,
    marginBottom: 40,
    marginTop: 160,
    letterSpacing: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    // borderColor: "red",
  },
})
