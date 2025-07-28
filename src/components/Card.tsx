import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Product, Seller } from '../types';
import { formatPrice, formatNumber } from '../types/formatters';
import { useStore } from '../store';
import CustomButton from './CustomButton';

interface ProductCardProps {
  type: 'product';
  data: Product;
  onPress: () => void;
  showAddToCart?: boolean;
  className?: string;
}

interface SellerCardProps {
  type: 'seller';
  data: Seller;
  onPress?: () => void;
  className?: string;
}

type CardProps = ProductCardProps | SellerCardProps;

const Card: React.FC<CardProps> = (props) => {
  const { addToCart, toggleLike, isLiked, toggleFollow } = useStore();

  if (props.type === 'product') {
    const { data: product, onPress, showAddToCart = true, className = '' } = props;
    const liked = isLiked(product.id);

    const handleAddToCart = (e: any) => {
      e.stopPropagation();
      addToCart(product);
    };

    const handleToggleLike = (e: any) => {
      e.stopPropagation();
      toggleLike(product.id);
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
        activeOpacity={0.9}
      >
        {/* Product Image */}
        <View className="relative">
          <Image
            source={product.image}
            style={{ width: '100%', height: 180 }}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          
          {/* Like Button */}
          <TouchableOpacity
            onPress={handleToggleLike}
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={18}
              color={liked ? "#EF4444" : "#6B7280"}
            />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View className="p-4">
          <Text className="text-text font-rSemibold text-base mb-1" numberOfLines={2}>
            {product.name}
          </Text>
          
          <Text className="text-gray-500 font-rMedium text-sm mb-2" numberOfLines={1}>
            {product.category}
          </Text>
          
          <Text className="text-primary font-rBold text-lg mb-3">
            {formatPrice(product.price)}
          </Text>

          {/* Add to Cart Button */}
          {showAddToCart && (
            <CustomButton
              title="Add to Cart"
              onPress={handleAddToCart}
              size="small"
              className="w-full"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  // Seller Card
  const { data: seller, onPress, className = '' } = props;

  const handleToggleFollow = () => {
    toggleFollow(seller.id);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}
      activeOpacity={0.9}
    >
      {/* Seller Image and Info */}
      <View className="items-center mb-4">
        <Image
          source={seller.image}
          style={{ width: 80, height: 80 }}
          contentFit="cover"
          className="rounded-full mb-3"
          cachePolicy="memory-disk"
        />
        
        <Text className="text-text font-rSemibold text-lg text-center mb-1">
          {seller.name}
        </Text>
        
        {/* Rating */}
        <View className="flex-row items-center mb-2">
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text className="text-gray-600 font-rMedium text-sm ml-1">
            {seller.rating.toFixed(1)}
          </Text>
        </View>
        
        {/* Followers */}
        <Text className="text-gray-500 font-rMedium text-sm mb-4">
          {formatNumber(seller.followers)} followers
        </Text>
      </View>

      {/* Follow Button */}
      <CustomButton
        title={seller.isFollowing ? "Unfollow" : "Follow"}
        onPress={handleToggleFollow}
        variant={seller.isFollowing ? "outline" : "primary"}
        size="small"
        className="w-full"
      />
    </TouchableOpacity>
  );
};

export default Card;