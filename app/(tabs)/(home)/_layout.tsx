import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="details" />
    </Stack>
  )
}

export default HomeLayout;