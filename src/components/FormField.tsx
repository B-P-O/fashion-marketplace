import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FormFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  className = '',
  inputClassName = '',
  labelClassName = '',
  ...textInputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      togglePasswordVisibility();
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return isPasswordVisible ? 'eye-off' : 'eye';
    }
    return rightIcon;
  };

  return (
    <View className={`mb-4 ${className}`}>
      {/* Label */}
      <Text className={`text-text font-rMedium text-base mb-2 ${labelClassName}`}>
        {label}
      </Text>

      {/* Input Container */}
      <View
        className={`
          flex-row items-center bg-white border rounded-lg px-4 py-3
          ${error ? 'border-error' : isFocused ? 'border-primary' : 'border-gray-300'}
          ${inputClassName}
        `}
      >
        {/* Left Icon */}
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? '#228B22' : '#A0AEC0'}
            style={{ marginRight: 12 }}
          />
        )}

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 font-rMedium text-text text-base"
          {...textInputProps}
        />

        {/* Right Icon */}
        {getRightIcon() && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            className="ml-3"
            activeOpacity={0.7}
          >
            <Ionicons
              name={getRightIcon()!}
              size={20}
              color={isFocused ? '#228B22' : '#A0AEC0'}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text className="text-error font-rMedium text-sm mt-2">
          {error}
        </Text>
      )}
    </View>
  );
};

export default FormField;