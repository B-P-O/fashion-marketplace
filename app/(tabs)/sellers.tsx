import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import { useStore } from '@/src/store';
import Card from '@/src/components/Card';
import Loading from '@/src/components/Loading';
import EmptyState from '@/src/components/EmptyState';
import { Seller } from '@/src/types';

const SellersScreen = () => {
  const { sellers, loading, toggleFollow } = useStore();

  const handleSellerPress = (seller: Seller) => {
    // Just show a toast since no backend
    Toast.show({
      type: 'info',
      text1: `${seller.name} Profile`,
      text2: 'Seller profile feature coming soon!',
      position: 'top',
      visibilityTime: 2000,
    });
  };

  const handleFollowToggle = (sellerId: string) => {
    const seller = sellers.find(s => s.id === sellerId);
    if (!seller) return;

    toggleFollow(sellerId);
    
    Toast.show({
      type: 'success',
      text1: seller.isFollowing ? 'Unfollowed!' : 'Following!',
      text2: seller.isFollowing 
        ? `You unfollowed ${seller.name}` 
        : `You are now following ${seller.name}`,
      position: 'top',
      visibilityTime: 2000,
    });
  };

  const renderSellerItem = ({ item }: { item: Seller }) => (
    <View className="flex-1 mx-2 mb-4">
      <Card
        type="seller"
        data={item}
        onPress={() => handleSellerPress(item)}
      />
    </View>
  );

  if (loading) {
    return <Loading text="Loading sellers..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-200 bg-white">
        <Text className="text-text font-rBold text-2xl">
          Sellers
        </Text>
        <Text className="text-gray-500 font-rMedium text-base">
          Discover amazing fashion brands
        </Text>
      </View>

      {/* Sellers Grid */}
      <View className="flex-1">
        {sellers.length > 0 ? (
          <FlatList
            data={sellers}
            renderItem={renderSellerItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View className="mb-4">
                <Text className="text-gray-600 font-rMedium text-sm text-center">
                  {sellers.length} sellers available
                </Text>
              </View>
            }
          />
        ) : (
          <EmptyState
            title="No Sellers Available"
            message="We're working on adding more sellers to the platform"
            icon="people-outline"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SellersScreen;