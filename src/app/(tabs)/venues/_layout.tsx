import { Stack } from 'expo-router';

export default function VenuesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="list" />
    </Stack>
  );
}
