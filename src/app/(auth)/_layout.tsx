import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="phone-otp" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="card" />
      <Stack.Screen name="membership" />
    </Stack>
  );
}
