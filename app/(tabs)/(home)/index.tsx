import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="/details">View details</Link>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});