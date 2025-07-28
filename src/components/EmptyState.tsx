import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from './CustomButton';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionTitle?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon = 'search-outline',
  actionTitle,
  onAction,
  className = '',
}) => {
  return (
    <View className={`flex-1 justify-center items-center px-8 ${className}`}>
      {/* Icon */}
      <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-6">
        <Ionicons name={icon} size={48} color="#A0AEC0" />
      </View>
      
      {/* Title */}
      <Text className="text-text font-rBold text-xl text-center mb-3">
        {title}
      </Text>
      
      {/* Message */}
      <Text className="text-gray-500 font-rMedium text-base text-center mb-8 leading-6">
        {message}
      </Text>
      
      {/* Action Button */}
      {actionTitle && onAction && (
        <CustomButton
          title={actionTitle}
          onPress={onAction}
          variant="primary"
          size="medium"
        />
      )}
    </View>
  );
};

export default EmptyState;