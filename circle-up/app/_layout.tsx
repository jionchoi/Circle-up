import { Stack } from "expo-router";
import './globals.css'

export default function RootLayout() {
  //Stack.Screen to remove the header layout which displays the folder location
  return <Stack>

    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />

  </Stack>;
}
