import { StyleSheet, Image } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'

import { Text, View } from 'components/Themed'
import { RootTabScreenProps } from 'types'
import Button from 'components/Button'
import { useUserContext } from 'hooks/useUserRef'
import { auth } from 'utils/firebase'

export default function ProfileScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [user] = useUserContext()

  /**
   * Opens the new project modal.
   */
  const onPressNewProject = () => navigation.navigate('Modal')

  /**
   * Logs the user out.
   */
  const onPressLogout = () => auth.signOut()

  /**
   * Return to the login screen.
   */
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return
    }

    navigation.navigate('LoginRegister')
  })

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.profileContainer}>
          <View style={styles.userImageContainer}>
            <Image source={{ uri: user.photoURL! }} style={styles.userImage} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.displayName}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
      )}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.buttonsContainer}>
        <Button
          onPress={onPressNewProject}
          title="New Project"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          style={styles.logoutButton}
          onPress={onPressLogout}
          title="Logout"
          accessibilityLabel="Logs the user out"
        />
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
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImageContainer: {
    overflow: 'hidden',
    borderRadius: 9999,
  },
  userImage: {
    width: 40,
    height: 40,
  },
  userInfo: {
    height: 34,
    marginLeft: 12,
    display: 'flex',
    justifyContent: 'space-between',
  },
  userName: {
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  logoutButton: {
    marginLeft: 10,
  },
})
