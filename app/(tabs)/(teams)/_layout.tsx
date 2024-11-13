import { Stack } from 'expo-router';

const TeamsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default TeamsLayout;