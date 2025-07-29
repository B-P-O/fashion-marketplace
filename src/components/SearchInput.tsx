import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useDebounce } from 'use-debounce';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSearchChange?: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search products...",
  className = '',
  onSearchChange,
}) => {
  const { searchQuery, setSearchQuery } = useStore();
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [debouncedQuery] = useDebounce(localQuery, 300);

  // Update store when debounced query changes
  useEffect(() => {
    setSearchQuery(debouncedQuery);
    if (onSearchChange) {
      onSearchChange(debouncedQuery);
    }
  }, [debouncedQuery, setSearchQuery, onSearchChange]);

  // Update local state when store query changes (for external updates)
  useEffect(() => {
    setLocalQuery(searchQuery || '');
  }, [searchQuery]);

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <View className={`flex-row items-center bg-white rounded-lg border border-gray-200 px-4 py-3 ${className}`}>
      <Ionicons name="search" size={20} color="#A0AEC0" />
      
      <TextInput
        value={localQuery}
        onChangeText={setLocalQuery}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
        className="flex-1 ml-3 font-rMedium text-text text-base"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {localQuery && localQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear} className="ml-2">
          <Ionicons name="close-circle" size={20} color="#A0AEC0" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;