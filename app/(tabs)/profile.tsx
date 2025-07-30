import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useStore } from '@/src/store';
import Card from '@/src/components/Card';
import EmptyState from '@/src/components/EmptyState';
import CustomButton from '@/src/components/CustomButton';
import { likedOrders } from '@/src/constants/data';
import { formatPrice } from '@/src/types/formatters';

const ProfileScreen = () => {
  const { user, likedProducts, products, getCartItemCount, getCartTotal } = useStore();

  const cartItemCount = getCartItemCount();
  const cartTotal = getCartTotal();
  const likedProductsData = products.filter(product => likedProducts.includes(product.id));

  const handleProductPress = (productId: string) => {
    router.push(`/details/${productId}`);
  };

  const handleEditProfile = () => {
    // Would navigate to edit profile in a real app
    console.log('Edit profile pressed');
  };

  const handleSettings = () => {
    // Would navigate to settings in a real app
    console.log('Settings pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="bg-white px-4 py-6 border-b border-gray-200">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text font-rBold text-2xl">
              Profile
            </Text>
            <TouchableOpacity
              onPress={handleSettings}
              className="p-2"
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View className="flex-row items-center">
            <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center mr-4">
              {user.avatar ? (
                <Image
                  source={user.avatar}
                  style={{ width: 80, height: 80 }}
                  className="rounded-full"
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              ) : (
                <Ionicons name="person" size={40} color="#A0AEC0" />
              )}
            </View>
            
            <View className="flex-1">
              <Text className="text-text font-rBold text-xl mb-1">
                {user.name}
              </Text>
              <Text className="text-gray-500 font-rMedium text-base mb-3">
                {user.email}
              </Text>
              
              <CustomButton
                title="Edit Profile"
                onPress={handleEditProfile}
                variant="outline"
                size="small"
                className="w-32"
              />
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm border border-gray-100">
          <Text className="text-text font-rSemibold text-lg mb-4">
            Shopping Stats
          </Text>
          
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-primary font-rBold text-2xl">
                {likedProducts.length}
              </Text>
              <Text className="text-gray-500 font-rMedium text-sm">
                Liked Items
              </Text>
            </View>
            
            <View className="items-center flex-1">
              <Text className="text-primary font-rBold text-2xl">
                {cartItemCount}
              </Text>
              <Text className="text-gray-500 font-rMedium text-sm">
                Cart Items
              </Text>
            </View>
            
            <View className="items-center flex-1">
              <Text className="text-primary font-rBold text-2xl">
                {formatPrice(cartTotal)}
              </Text>
              <Text className="text-gray-500 font-rMedium text-sm">
                Cart Total
              </Text>
            </View>
          </View>
        </View>

        {/* Liked Orders Section */}
        <View className="px-4 mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text font-rBold text-xl">
              Recent Orders
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-primary font-rSemibold text-base">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {likedOrders.length > 0 ? (
            <View>
              {likedOrders.map((order) => (
                <TouchableOpacity
                  key={order.id}
                  onPress={() => handleProductPress(order.product.id)}
                  className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
                  activeOpacity={0.9}
                >
                  <View className="flex-row items-center">
                    <Image
                      source={order.product.image}
                      style={{ width: 60, height: 60 }}
                      className="rounded-lg mr-4"
                      contentFit="cover"
                      cachePolicy="memory-disk"
                    />
                    
                    <View className="flex-1">
                      <Text className="text-text font-rSemibold text-base mb-1">
                        {order.product.name}
                      </Text>
                      <Text className="text-gray-500 font-rMedium text-sm mb-1">
                        {order.orderDate}
                      </Text>
                      <View className="flex-row items-center justify-between">
                        <Text className="text-primary font-rBold text-base">
                          {formatPrice(order.product.price)}
                        </Text>
                        <View className={`px-3 py-1 rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100' 
                            : 'bg-yellow-100'
                        }`}>
                          <Text className={`font-rSemibold text-xs ${
                            order.status === 'Delivered' 
                              ? 'text-green-700' 
                              : 'text-yellow-700'
                          }`}>
                            {order.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <EmptyState
              title="No Orders Yet"
              message="Start shopping to see your orders here"
              icon="bag-outline"
              actionTitle="Browse Catalog"
              onAction={() => router.push('/(tabs)/catalog')}
              className="h-40"
            />
          )}
        </View>

        {/* Liked Products Section */}
        <View className="px-4 mt-6">
          <Text className="text-text font-rBold text-xl mb-4">
            Liked Products ({likedProducts.length})
          </Text>

          {likedProductsData.length > 0 ? (
            <View className="flex-row flex-wrap justify-between">
              {likedProductsData.slice(0, 4).map((product) => (
                <View key={product.id} className="w-[48%] mb-4">
                  <Card
                    type="product"
                    data={product}
                    onPress={() => handleProductPress(product.id)}
                    showAddToCart={false}
                  />
                </View>
              ))}
              
              {likedProductsData.length > 4 && (
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/catalog')}
                  className="w-full items-center py-4"
                  activeOpacity={0.7}
                >
                  <Text className="text-primary font-rSemibold text-base">
                    View All Liked Products
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <EmptyState
              title="No Liked Products"
              message="Like products to see them here"
              icon="heart-outline"
              actionTitle="Explore Products"
              onAction={() => router.push('/(tabs)/catalog')}
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

export default ProfileScreen;