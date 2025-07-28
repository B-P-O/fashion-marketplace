import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  runOnJS
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { useStore } from '@/src/store';
import CustomButton from '@/src/components/CustomButton';
import Loading from '@/src/components/Loading';
import EmptyState from '@/src/components/EmptyState';
import { formatPrice } from '@/src/types/formatters';

const { width: screenWidth } = Dimensions.get('window');

const DetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { 
    products, 
    addToCart, 
    toggleLike, 
    isLiked,
    getCartItemCount 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === id);
  const liked = product ? isLiked(product.id) : false;

  // Animation values
  const slideX = useSharedValue(screenWidth);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: slideX.value },
      { scale: scale.value }
    ],
  }));

  const animatedBlurStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    // Initial animation - slide in from right
    slideX.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  const handleAddToCart = () => {
    if (!product) return;

    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Animation sequence
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1.05, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    // Add to cart
    addToCart(product, quantity);

    // Show success toast
    runOnJS(() => {
      Toast.show({
        type: 'success',
        text1: 'Added to Cart! 🛒',
        text2: `${quantity}x ${product.name}`,
        position: 'top',
        visibilityTime: 2000,
      });
    })();
  };

  const handlePayment = () => {
    if (!product) return;

    // Haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Payment animation - slide out and back
    slideX.value = withSequence(
      withTiming(-screenWidth, { duration: 300 }),
      withTiming(0, { duration: 300 })
    );

    // Show payment toast
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Payment Successful! 💳',
        text2: `Purchased ${quantity}x ${product.name}`,
        position: 'top',
        visibilityTime: 3000,
      });
    }, 300);
  };

  const handleToggleLike = () => {
    if (!product) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleLike(product.id);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <EmptyState
          title="Product Not Found"
          message="The product you're looking for doesn't exist"
          icon="cube-outline"
          actionTitle="Back to Catalog"
          onAction={() => router.back()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#228B22" />
        </TouchableOpacity>
        
        <Text className="text-text font-rBold text-lg">
          Product Details
        </Text>
        
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handleToggleLike}
            className="w-10 h-10 items-center justify-center mr-2"
            activeOpacity={0.7}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "#EF4444" : "#6B7280"}
            />
          </TouchableOpacity>
          
          <View className="relative">
            <Ionicons name="bag-outline" size={24} color="#228B22" />
            {getCartItemCount() > 0 && (
              <View className="absolute -top-2 -right-2 bg-accent w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white font-rBold text-xs">
                  {getCartItemCount()}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View className="relative">
          <Image
            source={product.image}
            style={{ width: screenWidth, height: 300 }}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          
          {/* Category Badge */}
          <View className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full">
            <Text className="text-text font-rSemibold text-sm">
              {product.category}
            </Text>
          </View>
        </View>

        {/* Product Info */}
        <View className="p-4 bg-white">
          <Text className="text-text font-rBold text-2xl mb-2">
            {product.name}
          </Text>
          
          <Text className="text-primary font-rBold text-3xl mb-4">
            {formatPrice(product.price)}
          </Text>
          
          <Text className="text-gray-600 font-rMedium text-base leading-6 mb-6">
            {product.description}
          </Text>

          {/* Quantity Selector */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-text font-rSemibold text-lg">
              Quantity
            </Text>
            
            <View className="flex-row items-center bg-gray-100 rounded-lg">
              <TouchableOpacity
                onPress={() => handleQuantityChange(-1)}
                className="w-10 h-10 items-center justify-center"
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={20} color="#228B22" />
              </TouchableOpacity>
              
              <Text className="text-text font-rBold text-lg px-4">
                {quantity}
              </Text>
              
              <TouchableOpacity
                onPress={() => handleQuantityChange(1)}
                className="w-10 h-10 items-center justify-center"
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={20} color="#228B22" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Total Price */}
          <View className="flex-row items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
            <Text className="text-text font-rSemibold text-lg">
              Total Price
            </Text>
            <Text className="text-primary font-rBold text-2xl">
              {formatPrice(product.price * quantity)}
            </Text>
          </View>
        </View>

        {/* Bottom Padding */}
        <View className="h-32" />
      </ScrollView>

      {/* Animated Payment Button with Blur Background */}
      <Animated.View 
        style={[animatedBlurStyle]} 
        className="absolute bottom-0 left-0 right-0"
      >
        <BlurView intensity={80} tint="light" className="p-4 border-t border-gray-200">
          <View className="flex-row gap-3">
            <CustomButton
              title="Add to Cart"
              onPress={handleAddToCart}
              variant="outline"
              size="large"
              className="flex-1"
              icon={<Ionicons name="bag-add" size={20} color="#228B22" />}
            />
            
            <Animated.View style={[animatedButtonStyle, { flex: 1 }]}>
              <CustomButton
                title="Buy Now"
                onPress={handlePayment}
                variant="primary"
                size="large"
                className="w-full"
                icon={<Ionicons name="card" size={20} color="white" />}
              />
            </Animated.View>
          </View>
        </BlurView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default DetailScreen;