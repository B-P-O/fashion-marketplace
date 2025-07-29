import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { useStore } from '../src/store';
import "@/global.css";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { initializeCache } = useStore();
  
  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../src/assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../src/assets/fonts/Rubik-Bold.ttf'),
    'Rubik-ExtraBold': require('../src/assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Medium': require('../src/assets/fonts/Rubik-Medium.ttf'),
    'Rubik-SemiBold': require('../src/assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Light': require('../src/assets/fonts/Rubik-Light.ttf'),
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        // Initialize cache
        await initializeCache();
        
        // Hide splash screen once everything is loaded
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.warn('Initialization error:', error);
        // Hide splash screen even if there's an error
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
    };

    prepare();
  }, [fontsLoaded, initializeCache]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
      </Stack>
      
      <StatusBar style="dark" /> style="dark" backgroundColor="#F8F8FF" />
      <Toast />
    </>
  );
};

export default RootLayout;