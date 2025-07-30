import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import CustomButton from '@/src/components/CustomButton';
import { images } from '@/src/constants';

const LoginScreen = () => {
  const handleLogin = () => {
    // Show success toast
    Toast.show({
      type: 'success',
      text1: 'Login Successful! 🎉',
      text2: 'Welcome to Fashion Marketplace',
      position: 'top',
      visibilityTime: 2000,
    });

    // Navigate to main app after short delay
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 1000);
  };

  return (
    <>
      <View className="flex-1 h-full justify-center items-center px-6" style={{ backgroundColor: 'lightgray'} }>
        {/* Onboarding Image */}
        <View className="w-3/4 h-1/2 mb-4">
          <Image
            source={images.onboarding}
            style={{ width: '100%', height: '100%' }}
            contentFit="contain"
            className="rounded-2xl"
            cachePolicy="memory-disk"
          />
        </View>

        {/* Welcome Text */}
        <View className="items-center mb-4" >
          <Text className="text-text font-rExtrabold text-3xl text-center mb-4">
            Welcome to Fashion Marketplace
          </Text>
          <Text className="text-gray-500 font-rBold text-lg text-center leading-6">
            Discover the latest trends and shop from your favorite brands
          </Text>
        </View>

        {/* Login Button */}
        <View className="w-full">
          <CustomButton
            title="Get Started"
            onPress={handleLogin}
            variant="primary"
            size="large"
            className="w-full mb-4"
          />
          
        
        </View>
      </View>
    </>
  );
};

export default LoginScreen;