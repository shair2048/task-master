import { Stack } from 'expo-router'

const DashboardLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default DashboardLayout;