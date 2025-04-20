import { Stack } from "expo-router";
import { Colors } from "@/constants/colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "SafeBridge Rewards",
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          title: "Login",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: "Create Account",
          headerShown: true,
        }} 
      />
    </Stack>
  );
}