import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useStore } from '../store';
import { categories } from '../constants/data';
import { FilterCategory } from '../types';

interface FiltersProps {
  className?: string;
  showTitle?: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  className = '',
  showTitle = true,
}) => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const handleCategorySelect = (category: FilterCategory) => {
    setSelectedCategory(category);
  };

  return (
    <View className={className}>
      {showTitle && (
        <Text className="text-text font-rSemibold text-lg mb-3">Categories</Text>
      )}
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.value;
          
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategorySelect(category.value as FilterCategory)}
              className={`
                px-4 py-2 rounded-full border
                ${index === categories.length - 1 ? 'mr-3' : 'mr-6'}
                ${isSelected 
                  ? 'bg-primary border-primary' 
                  : 'bg-white border-gray-300'
                }
              `}
              activeOpacity={0.7}
            >
              <Text
                className={`
                  font-rMedium text-sm
                  ${isSelected ? 'text-white' : 'text-text'}
                `}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Filters;