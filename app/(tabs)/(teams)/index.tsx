import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';

const TeamsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Teams</Text>
    </View>
  )
}

export default TeamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});