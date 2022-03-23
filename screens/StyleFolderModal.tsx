import React, { useEffect } from 'react'
import { Image } from 'react-native'
import { Text, View } from 'components/Themed' // need view
import { RootTabScreenProps } from 'types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import ProjectThemes, { IProjectTheme, Themes } from 'constants/ProjectThemes'

type RootStackParamList = {
  StyleFolderModal: { projectTheme: IProjectTheme }
}

type Props = NativeStackScreenProps<RootStackParamList, 'StyleFolderModal'>

const ExpandedImageModal: React.FC<Props> = ({ route, navigation }) => {
  //   const { name, filepath } = route.params
  const { projectTheme } = route.params

  useEffect(() => {
    navigation.setOptions({ headerTitle: `'${projectTheme.name}' styles` })
  })

  return (
    <View>
      <Text>{projectTheme.name}</Text>
    </View>
  )
}

export default ExpandedImageModal
