import { StyleSheet, Image, Dimensions } from 'react-native'
import { Text, View } from 'components/Themed'
import Button from 'components/Button'
import * as Sharing from 'expo-sharing'

const { width, height } = Dimensions.get('screen')
const containerWidth = width * 0.8

export default function FinishedArtScreen({ route, navigation }) {
  const { image } = route.params

  const shareImage = async () => {
    if (await Sharing.isAvailableAsync()) {
      Sharing.shareAsync(image)
    }
  }

  const handleHome = () => navigation.navigate('Profile')

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
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
    width: containerWidth,
    height: containerWidth,
    marginBottom: 10,
  },
  shareButton: { alignSelf: 'center', width: containerWidth / 2 - 20, marginTop: 20, marginHorizontal: 10 },
})
