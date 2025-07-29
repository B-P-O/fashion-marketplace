import { create } from 'zustand';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Product, CartItem, Seller, FilterCategory, SortOption, User } from '../types';
import { products as mockProducts, sellers as mockSellers, mockUser } from '../constants/data';

// Store interface
interface StoreState {
  // Data
  products: Product[];
  sellers: Seller[];
  cart: CartItem[];
  likedProducts: string[];
  user: User;
  
  // UI State
  loading: boolean;
  searchQuery: string;
  selectedCategory: FilterCategory;
  sortBy: SortOption;
  
  // Cache
  cachedProducts: Product[];
  lastCacheUpdate: number;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setSellers: (sellers: Seller[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: FilterCategory) => void;
  setSortBy: (sort: SortOption) => void;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  
  // Like actions
  toggleLike: (productId: string) => void;
  isLiked: (productId: string) => boolean;
  
  // Seller actions
  toggleFollow: (sellerId: string) => void;
  
  // Data filtering/sorting
  getFilteredProducts: () => Product[];
  getBestSellers: () => Product[];
  
  // Cache actions
  initializeCache: () => Promise<void>;
  cacheProducts: () => Promise<void>;
  loadFromCache: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial state
  products: mockProducts || [],
  sellers: mockSellers || [],
  cart: [],
  likedProducts: [],
  user: mockUser || { name: 'User', email: 'user@email.com' },
  loading: false,
  searchQuery: '',
  selectedCategory: 'All',
  sortBy: 'name-asc',
  cachedProducts: [],
  lastCacheUpdate: 0,

  // Basic setters
  setProducts: (products) => set({ products: products || [] }),
  setSellers: (sellers) => set({ sellers: sellers || [] }),
  setLoading: (loading) => set({ loading: Boolean(loading) }),
  setSearchQuery: (searchQuery) => set({ searchQuery: searchQuery || '' }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),

  // Cart actions
  addToCart: (product, quantity = 1) => {
    if (!product || !product.id) return;
    
    const { cart } = get();
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      set({
        cart: cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      set({ cart: [...cart, { product, quantity }] });
    }
  },

  removeFromCart: (productId) => {
    if (!productId) return;
    const { cart } = get();
    set({ cart: cart.filter(item => item.product.id !== productId) });
  },

  updateCartQuantity: (productId, quantity) => {
    if (!productId) return;
    const { cart } = get();
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set({
      cart: cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    });
  },

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    const { cart } = get();
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((total, item) => {
      if (!item || !item.product || typeof item.product.price !== 'number') return total;
      return total + (item.product.price * item.quantity);
    }, 0);
  },

  getCartItemCount: () => {
    const { cart } = get();
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((count, item) => {
      if (!item || typeof item.quantity !== 'number') return count;
      return count + item.quantity;
    }, 0);
  },

  // Like actions
  toggleLike: (productId) => {
    if (!productId) return;
    const { likedProducts } = get();
    const isCurrentlyLiked = likedProducts.includes(productId);
    
    set({
      likedProducts: isCurrentlyLiked
        ? likedProducts.filter(id => id !== productId)
        : [...likedProducts, productId]
    });
  },

  isLiked: (productId) => {
    if (!productId) return false;
    const { likedProducts } = get();
    return likedProducts.includes(productId);
  },

  // Seller actions
  toggleFollow: (sellerId) => {
    if (!sellerId) return;
    const { sellers } = get();
    set({
      sellers: sellers.map(seller =>
        seller.id === sellerId
          ? { ...seller, isFollowing: !seller.isFollowing }
          : seller
      )
    });
  },

  // Data filtering/sorting
  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory, sortBy } = get();
    
    if (!products || products.length === 0) return [];
    
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        (product.name && product.name.toLowerCase().includes(query)) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        default:
          return 0;
      }
    });
    
    return filtered;
  },

  getBestSellers: () => {
    const { products } = get();
    if (!products || products.length === 0) return [];
    // Simulate best sellers by taking products with higher prices
    return [...products]
      .sort((a, b) => (b.price || 0) - (a.price || 0))
      .slice(0, 6);
  },

  // Cache actions for offline support
  initializeCache: async () => {
    try {
      const cacheDir = `${FileSystem.documentDirectory}fashion-cache/`;
      const dirInfo = await FileSystem.getInfoAsync(cacheDir);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
      }
      
      // Load from cache if available
      await get().loadFromCache();
    } catch (error) {
      console.warn('Cache initialization failed:', error);
    }
  },

  cacheProducts: async () => {
    try {
      const { products } = get();
      const cacheFile = `${FileSystem.documentDirectory}fashion-cache/products.json`;
      const cacheData = {
        products,
        timestamp: Date.now()
      };
      
      await FileSystem.writeAsStringAsync(cacheFile, JSON.stringify(cacheData));
      set({ cachedProducts: products, lastCacheUpdate: Date.now() });
    } catch (error) {
      console.warn('Cache save failed:', error);
    }
  },

  loadFromCache: async () => {
    try {
      const cacheFile = `${FileSystem.documentDirectory}fashion-cache/products.json`;
      const fileInfo = await FileSystem.getInfoAsync(cacheFile);
      
      if (fileInfo.exists) {
        const cacheContent = await FileSystem.readAsStringAsync(cacheFile);
        const { products, timestamp } = JSON.parse(cacheContent);
        
        // Use cache if it's less than 24 hours old
        const isValidCache = Date.now() - timestamp < 24 * 60 * 60 * 1000;
        
        if (isValidCache && products && products.length > 0) {
          set({ 
            cachedProducts: products, 
            lastCacheUpdate: timestamp,
            products: products 
          });
        }
      }
    } catch (error) {
      console.warn('Cache load failed:', error);
    }
  }
}));