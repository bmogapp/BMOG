import { Stack } from 'expo-router';

export default function VenueLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="booking" />
      <Stack.Screen name="confirm" />
      <Stack.Screen name="confirmed" />
    </Stack>
  );
}
