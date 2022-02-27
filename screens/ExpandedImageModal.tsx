import React, { useEffect } from 'react'
import { Image } from 'react-native'
import { Text, View } from 'components/Themed' // need view
import { RootTabScreenProps } from 'types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type RootStackParamList = {
  ExpandedImageModal: { name: string; filepath: string }
}

type Props = NativeStackScreenProps<RootStackParamList, 'ExpandedImageModal'>

const ExpandedImageModal: React.FC<Props> = ({ route, navigation }) => {
  const { name, filepath } = route.params

  useEffect(() => {
    navigation.setOptions({ headerTitle: name })
  })

  return (
    <View>
      {filepath && <Image source={{ uri: filepath }} style={{ width: '100%', height: '100%' }}></Image>}
      {!filepath && <Text>(No filepath supplied)</Text>}
    </View>
  )
}

export default ExpandedImageModal
