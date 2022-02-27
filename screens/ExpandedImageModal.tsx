import React, { useEffect } from 'react'
import { Text, View } from 'components/Themed' // need view
import { RootTabScreenProps } from 'types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

// interface Props {
//   title: string
//   navigation: RootTabScreenProps<'ExpandedImageModal'>
// }
type RootStackParamList = {
  ExpandedImageModal: { name: string }
}

type Props = NativeStackScreenProps<RootStackParamList, 'ExpandedImageModal'>

const ExpandedImageModal: React.FC<Props> = ({ route, navigation }) => {
  const { name } = route.params

  useEffect(() => {
    navigation.setOptions({ headerTitle: name })
  })

  return (
    <View>
      <Text>ExpandedImageModal</Text>
    </View>
  )
}

export default ExpandedImageModal
