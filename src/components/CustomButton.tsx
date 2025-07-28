import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  textClassName?: string;
  hapticFeedback?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  className = '',
  textClassName = '',
  hapticFeedback = true,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    onPress();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary border-primary';
      case 'secondary':
        return 'bg-secondary border-secondary';
      case 'accent':
        return 'bg-accent border-accent';
      case 'outline':
        return 'bg-transparent border-primary border-2';
      default:
        return 'bg-primary border-primary';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 min-h-[36px]';
      case 'medium':  
        return 'px-6 py-3 min-h-[44px]';
      case 'large':
        return 'px-8 py-4 min-h-[52px]';
      default:
        return 'px-6 py-3 min-h-[44px]';
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') return 'text-primary';
    if (variant === 'secondary') return 'text-text';
    return 'text-white';
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        rounded-lg
        flex-row
        items-center
        justify-center
        border
        ${disabled || loading ? 'opacity-50' : 'opacity-100'}
        ${className}
      `}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#228B22' : '#FFFFFF'} 
        />
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && (
            <View className="mr-2">
              {icon}
            </View>
          )}
          <Text
            className={`
              font-rSemibold
              ${getTextColor()}
              ${getTextSize()}
              text-center
              ${textClassName}
            `}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;