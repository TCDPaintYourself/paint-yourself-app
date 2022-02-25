import { StyleSheet, Image, Dimensions } from 'react-native'
import * as Sharing from 'expo-sharing'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { View } from 'components/Themed'
import Button from 'components/Button'
import { IProjectTheme } from 'constants/ProjectThemes'
import { useGetStyledImage } from 'hooks/useGetStyledImage'
import { CameraImage } from 'types'

const { width } = Dimensions.get('screen')
const containerWidth = width * 0.8

type RootStackParamList = {
  FinishedArtScreen: { image: CameraImage; theme: IProjectTheme }
  Profile: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'FinishedArtScreen'>

export function FinishedArtScreen({ route, navigation }: Props) {
  const { image, theme } = route.params
  const [_isLoading, _error, outputImage] = useGetStyledImage(image, theme.name)

  const shareImage = async () => {
    if ((await Sharing.isAvailableAsync()) && outputImage) {
      Sharing.shareAsync(outputImage)
    }
  }

  const handleHome = () => navigation.navigate('Profile')

  return (
    <View style={styles.container}>
      {outputImage && <Image source={{ uri: outputImage }} style={styles.image} />}
      <View style={styles.row}>
        <Button onPress={shareImage} style={styles.shareButton} title="Share" />
        <Button onPress={handleHome} style={styles.shareButton} title="Home" />
      </View>
    </View>
  )
}

export default FinishedArtScreen

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