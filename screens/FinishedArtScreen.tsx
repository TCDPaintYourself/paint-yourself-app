import { StyleSheet, Image, Dimensions } from 'react-native'
import { Text, View } from 'components/Themed'
import Button from 'components/Button'
import * as Sharing from 'expo-sharing'

const { width, height } = Dimensions.get('screen')
const containerWidth = width * 0.8

export default function FinishedArtScreen({ route }) {
  const { image } = route.params

  const shareImage = async () => {
    console.log('share')
    if (await Sharing.isAvailableAsync()) {
      console.log('sharing available')
      //   Sharing.shareAsync(image)
      //test
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Button onPress={shareImage} style={styles.shareButton} title="Share" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  shareButton: { alignSelf: 'center', width: containerWidth, marginVertical: 15 },
})
