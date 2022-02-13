import { StyleSheet, Image } from 'react-native'

import { Text, View } from 'components/Themed'
import { RootTabScreenProps } from 'types'
import Button from 'components/Button'
import { useUserContext } from 'hooks/useUserRef'

export default function ProfileScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [user] = useUserContext()

  function newProject() {
    navigation.navigate('Modal')
  }

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
      <Button onPress={newProject} title="NEW PROJECT" accessibilityLabel="Learn more about this purple button" />
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
})
