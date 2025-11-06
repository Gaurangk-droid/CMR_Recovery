import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  // Redirect root ("/") to "/welcome"
  return (
    <>
      <Redirect href="/welcome" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
