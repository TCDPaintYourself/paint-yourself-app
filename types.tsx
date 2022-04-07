/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Themes } from 'constants/ProjectThemes'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  ExpandedImageModal: undefined
  StyleFolderModal: undefined
  LoginRegister: undefined
  Modal: undefined
  ChooseStyleScreen: undefined
  FinishedArtScreen: undefined
  BottomTabNavigator: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabParamList = {
  ExpandedImageModal: undefined
  StyleFolderModal: undefined
  LoginRegister: undefined
  NewProject: undefined
  Profile: undefined
  Settings: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type CameraImage = {
  height: number
  width: number
  uri: string
  camera: boolean
}
