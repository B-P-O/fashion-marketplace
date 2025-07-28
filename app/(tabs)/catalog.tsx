import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useStore } from '@/src/store';
import SearchInput from '@/src/components/SearchInput';
import Filters from '@/src/components/Filters';
import Card from '@/src/components/Card';
import Loading from '@/src/components/Loading';
import EmptyState from '@/src/components/EmptyState';
import CustomButton from '@/src/components/CustomButton';
import { Product, SortOption } from '@/src/types';
import { sortOptions } from '@/src/constants/data';

const ITEMS_PER_PAGE = 10;

const CatalogScreen = () => {
  const { 
    loading, 
    getFilteredProducts, 
    sortBy, 
    setSortBy,
    selectedCategory 
  } = useStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [showSortModal, setShowSortModal] = useState(false);

  const filteredProducts = getFilteredProducts();
  
  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handleProductPress = (productId: string) => {
    router.push(`/details/${productId}`);
  };

  const handleSortSelect = (sort: SortOption) => {
    setSortBy(sort);
    setShowSortModal(false);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <Card
      type="product"
      data={item}
      onPress={() => handleProductPress(item.id)}
      className="flex-1 mx-2 mb-4"
    />
  );

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageChange(i)}
          className={`
            w-10 h-10 rounded-lg items-center justify-center mx-1
            ${i === currentPage 
              ? 'bg-primary' 
              : 'bg-white border border-gray-300'
            }
          `}
          activeOpacity={0.7}
        >
          <Text
            className={`
              font-rSemibold text-sm
              ${i === currentPage ? 'text-white' : 'text-text'}
            `}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return pages;
  };

  if (loading) {
    return <Loading text="Loading catalog..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-200 bg-white">
        <Text className="text-text font-rBold text-2xl mb-3">
          Catalog
        </Text>
        
        {/* Search Bar */}
        <SearchInput placeholder="Search products..." />
      </View>

      {/* Filters and Sort */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-text font-rSemibold text-lg">
            Filters
          </Text>
          <TouchableOpacity
            onPress={() => setShowSortModal(true)}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <Ionicons name="swap-vertical" size={18} color="#228B22" />
            <Text className="text-primary font-rSemibold text-sm ml-2">
              Sort
            </Text>
          </TouchableOpacity>
        </View>
        
        <Filters showTitle={false} />
      </View>

      {/* Results Info */}
      <View className="px-4 py-3 bg-gray-50">
        <Text className="text-gray-600 font-rMedium text-sm">
          {filteredProducts.length} products found
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </Text>
      </View>

      {/* Product Grid */}
      <View className="flex-1">
        {paginatedProducts.length > 0 ? (
          <FlatList
            data={paginatedProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              totalPages > 1 ? (
                <View className="items-center mt-6">
                  {/* Page Numbers */}
                  <View className="flex-row items-center mb-4">
                    <Text className="text-gray-600 font-rMedium text-sm mr-4">
                      Page {currentPage} of {totalPages}
                    </Text>
                  </View>
                  
                  {/* Pagination Controls */}
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={handlePreviousPage}
                      disabled={currentPage === 1}
                      className={`
                        w-10 h-10 rounded-lg items-center justify-center mr-2
                        ${currentPage === 1 
                          ? 'bg-gray-200' 
                          : 'bg-white border border-gray-300'
                        }
                      `}
                      activeOpacity={0.7}
                    >
                      <Ionicons 
                        name="chevron-back" 
                        size={18} 
                        color={currentPage === 1 ? '#A0AEC0' : '#228B22'} 
                      />
                    </TouchableOpacity>

                    {renderPaginationNumbers()}

                    <TouchableOpacity
                      onPress={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`
                        w-10 h-10 rounded-lg items-center justify-center ml-2
                        ${currentPage === totalPages 
                          ? 'bg-gray-200' 
                          : 'bg-white border border-gray-300'
                        }
                      `}
                      activeOpacity={0.7}
                    >
                      <Ionicons 
                        name="chevron-forward" 
                        size={18} 
                        color={currentPage === totalPages ? '#A0AEC0' : '#228B22'} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            }
          />
        ) : (
          <EmptyState
            title="No Products Found"
            message="Try adjusting your search or filter criteria"
            icon="search-outline"
            actionTitle="Clear Filters"
            onAction={() => {
              setCurrentPage(1);
              // You could add logic to clear filters here
            }}
          />
        )}
      </View>

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-text font-rBold text-xl">
                Sort By
              </Text>
              <TouchableOpacity
                onPress={() => setShowSortModal(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleSortSelect(option.value as SortOption)}
                className="flex-row items-center justify-between py-4 border-b border-gray-100"
                activeOpacity={0.7}
              >
                <Text
                  className={`
                    font-rMedium text-base
                    ${sortBy === option.value ? 'text-primary' : 'text-text'}
                  `}
                >
                  {option.label}
                </Text>
                {sortBy === option.value && (
                  <Ionicons name="checkmark" size={20} color="#228B22" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CatalogScreen;