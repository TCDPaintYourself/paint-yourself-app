import React, { useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as Sharing from 'expo-sharing'

import { Text, View } from 'components/Themed' // need view
import Button from 'components/Button'

type RootStackParamList = {
  ExpandedImageModal: { name: string; filepath: string }
}

type Props = NativeStackScreenProps<RootStackParamList, 'ExpandedImageModal'>

const ExpandedImageModal: React.FC<Props> = ({ route, navigation }) => {
  const { name, filepath } = route.params

  useEffect(() => {
    navigation.setOptions({ headerTitle: name })
  }, [])

  const shareImage = async () => {
    if (await Sharing.isAvailableAsync()) {
      Sharing.shareAsync(filepath)
    }
  }

  return (
    <View>
      {filepath && (
        <View style={styles.container}>
          <Image source={{ uri: filepath }} style={styles.image} />
          <Button onPress={shareImage} title="Share" style={styles.shareButton} />
        </View>
      )}
      {!filepath && <Text>(No filepath supplied)</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { display: 'flex', height: '100%' },
  image: { flex: 1 },
  shareButton: { borderRadius: 0 },
})

export default ExpandedImageModal
