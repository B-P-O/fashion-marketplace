import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingProps {
  text?: string;
  size?: 'small' | 'large';
  color?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  text = 'Loading...',
  size = 'large',
  color = '#228B22', // primary color
  className = '',
}) => {
  return (
    <View className={`flex-1 justify-center items-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text className="text-text font-rMedium text-base mt-4 text-center">
          {text}
        </Text>
      )}
    </View>
  );
};

export default Loading;