/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { RootStackParamList, RootTabParamList } from 'types'

// SCREENS
import LoginRegisterScreen from 'screens/LoginRegisterScreen'
import ProfileScreen from 'screens/ProfileScreen'
import NewProjectScreen from 'screens/NewProjectScreen'
import ChooseStyleScreen from 'screens/ChooseStyleScreen'
import FinishedArtScreen from 'screens/FinishedArtScreen'
import SettingsScreen from 'screens/SettingsScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="LoginRegister" screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="ChooseStyleScreen"
          component={ChooseStyleScreen}
          options={{
            title: 'Select Style',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="FinishedArtScreen"
          component={FinishedArtScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={NewProjectScreen} />
      </Stack.Group> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIconFA name="user" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="NewProject"
        component={NewProjectScreen}
        options={{
          title: 'New Project',
          tabBarIcon: ({ color }) => <TabBarIconMaterial name="camera-plus" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIconFA name="cog" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

// Added another functional component for MaterialCommunityIcons
function TabBarIconFA(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: 2 }} {...props} />
}

function TabBarIconMaterial(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  color: string
}) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: 2 }} {...props} />
}
