/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import NewProjectScreen from 'screens/NewProjectScreen'
import NotFoundScreen from 'screens/NotFoundScreen'
import ProfileScreen from 'screens/ProfileScreen'
import SettingsScreen from 'screens/SettingsScreen'
import LoginRegisterScreen from 'screens/LoginRegisterScreen'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from 'types'
import LinkingConfiguration from 'navigation/LinkingConfiguration'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginRegister">
      <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={NewProjectScreen} />
      </Stack.Group>
    </Stack.Navigator>
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
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIconFA name="user" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="NewProject"
        component={NewProjectScreen}
        options={({ navigation }: RootTabScreenProps<'NewProject'>) => ({
          title: 'New Project',
          tabBarIcon: ({ color }) => <TabBarIconMaterial name="camera-plus" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
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
