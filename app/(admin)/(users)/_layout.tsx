import { Stack } from 'expo-router'

const UsersLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default UsersLayout;