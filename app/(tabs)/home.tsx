import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useStore } from '@/src/store';
import SearchInput from '@/src/components/SearchInput';
import Card from '@/src/components/Card';
import Loading from '@/src/components/Loading';
import EmptyState from '@/src/components/EmptyState';
import { carouselImages } from '@/src/constants/data';
import { Product } from '@/src/types';

const { width: screenWidth } = Dimensions.get('window');
const CAROUSEL_WIDTH = screenWidth - 32; // Account for padding

const HomeScreen = () => {
  const { 
    products, 
    cart, 
    loading, 
    getFilteredProducts, 
    getBestSellers, 
    getCartItemCount,
    setSearchQuery 
  } = useStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll animation for carousel
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Fixed useEffect with proper cleanup
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % carouselImages.length;
        
        // Animate to next image
        translateX.value = withTiming(-nextIndex * CAROUSEL_WIDTH, { duration: 500 });
        
        return nextIndex;
      });
    }, 3000);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array to run only once

  const filteredProducts = getFilteredProducts();
  const bestSellers = getBestSellers();
  const cartItemCount = getCartItemCount();

  const handleProductPress = useCallback((productId: string) => {
    router.push(`/details/${productId}`);
  }, []);

  const handleCartPress = useCallback(() => {
    // Would navigate to cart screen in a real app
    router.push('/(tabs)/catalog');
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      router.push('/(tabs)/catalog');
    }
  }, [setSearchQuery]);

  const renderProductItem = useCallback(({ item }: { item: Product }) => (
    <Card
      type="product"
      data={item}
      onPress={() => handleProductPress(item.id)}
      className="w-44 mr-4"
    />
  ), [handleProductPress]);

  if (loading) {
    return <Loading text="Loading marketplace..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <View>
            <Text className="text-text font-rBold text-2xl">
              Fashion Marketplace
            </Text>
            <Text className="text-gray-500 font-rMedium text-base">
              Discover amazing products
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={handleCartPress}
            className="relative p-2"
            activeOpacity={0.7}
          >
            <Ionicons name="bag" size={28} color="#228B22" />
            {cartItemCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-accent w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white font-rBold text-xs">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-6">
          <SearchInput
            placeholder="Search for fashion items..."
            onSearchChange={handleSearchChange}
          />
        </View>

        {/* Animated Carousel */}
        <View className="px-4 mb-6">
          <View 
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
            style={{ width: CAROUSEL_WIDTH, height: 200 }}
          >
            <Animated.View 
              className="flex-row"
              style={[
                animatedStyle,
                { width: CAROUSEL_WIDTH * carouselImages.length }
              ]}
            >
              {carouselImages.map((image, index) => (
                <Image
                  key={index}
                  source={image}
                  style={{ width: CAROUSEL_WIDTH, height: 200 }}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              ))}
            </Animated.View>
          </View>
          
          {/* Carousel Indicators */}
          <View className="flex-row justify-center mt-4">
            {carouselImages.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Best Sellers Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <Text className="text-text font-rBold text-xl">
              Best Sellers
            </Text>
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/catalog')}
              activeOpacity={0.7}
            >
              <Text className="text-primary font-rSemibold text-base">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          
          {bestSellers.length > 0 ? (
            <FlatList
              data={bestSellers}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />
          ) : (
            <EmptyState
              title="No Best Sellers"
              message="Check back later for trending products"
              icon="trending-up-outline"
              className="h-40"
            />
          )}
        </View>

        {/* Featured Products Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <Text className="text-text font-rBold text-xl">
              Featured Products
            </Text>
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/catalog')}
              activeOpacity={0.7}
            >
              <Text className="text-primary font-rSemibold text-base">
                View Catalog
              </Text>
            </TouchableOpacity>
          </View>
          
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts.slice(0, 6)}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />
          ) : (
            <EmptyState
              title="No Products Available"
              message="We're working on adding more products"
              icon="cube-outline"
              className="h-40"
            />
          )}
        </View>

        {/* Bottom Padding */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;