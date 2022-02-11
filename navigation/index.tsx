/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
import NewProjectScreen from 'screens/NewProjectScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import ProfileScreen from 'screens/ProfileScreen';
import SettingsScreen from 'screens/SettingsScreen';
import CameraScreen from "screens/CameraScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from 'types';
import LinkingConfiguration from 'navigation/LinkingConfiguration';
import LoginRegisterScreen from "screens/LoginRegisterScreen";

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
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={CameraScreen}
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: 2 }} {...props} />
}
