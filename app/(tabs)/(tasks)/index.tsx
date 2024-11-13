import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';

const TasksScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tasks</Text>
    </View>
  )
}

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});