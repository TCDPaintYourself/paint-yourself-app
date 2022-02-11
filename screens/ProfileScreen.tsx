import { StyleSheet } from 'react-native'
import { Text, View } from 'components/Themed'
import { RootTabScreenProps } from 'types'
import Button from 'components/Button'

export default function ProfileScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  function newProject() {
    navigation.navigate('Modal')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
