import images from "./images";

// Mock Products Data (12 products - 3 per category)
export const products = [
  // Men's Fashion
  {
    id: "1",
    name: "Classic Denim Jacket",
    price: 89.99,
    category: "Men",
    image: images.men1,
    description: "A timeless denim jacket perfect for casual outings. Made from premium cotton denim with classic blue wash finish."
  },
  {
    id: "2", 
    name: "Formal Business Suit",
    price: 299.99,
    category: "Men",
    image: images.men2,
    description: "Professional slim-fit suit ideal for business meetings and formal events. Includes jacket and matching trousers."
  },
  {
    id: "3",
    name: "Casual Cotton T-Shirt",
    price: 24.99,
    category: "Men",
    image: images.men3,
    description: "Comfortable 100% cotton t-shirt with modern fit. Available in multiple colors, perfect for everyday wear."
  },

  // Women's Fashion
  {
    id: "4",
    name: "Elegant Evening Dress",
    price: 159.99,
    category: "Women",
    image: images.women1,
    description: "Stunning evening dress with flowing silhouette. Perfect for special occasions and dinner parties."
  },
  {
    id: "5",
    name: "Summer Floral Blouse", 
    price: 45.99,
    category: "Women",
    image: images.women2,
    description: "Light and breezy floral blouse ideal for spring and summer. Features beautiful botanical prints."
  },
  {
    id: "6",
    name: "Professional Blazer",
    price: 119.99,
    category: "Women",
    image: images.women3,
    description: "Sophisticated blazer for professional settings. Tailored fit with modern styling and premium fabric."
  },

  // Baby Boy Fashion
  {
    id: "7",
    name: "Adorable Romper Set",
    price: 29.99,
    category: "Baby Boy",
    image: images.babyboy1,
    description: "Cute and comfortable romper set for little boys. Soft fabric with playful prints and easy-change design."
  },
  {
    id: "8",
    name: "Tiny Gentleman Outfit",
    price: 39.99,
    category: "Baby Boy", 
    image: images.babyboy2,
    description: "Formal baby outfit complete with vest and bow tie. Perfect for special occasions and photo sessions."
  },
  {
    id: "9",
    name: "Cozy Sleepwear Set",
    price: 19.99,
    category: "Baby Boy",
    image: images.babyboy3,
    description: "Soft and warm sleepwear set designed for comfort. Features adorable animal prints and snap closures."
  },

  // Baby Girl Fashion
  {
    id: "10",
    name: "Princess Party Dress",
    price: 34.99,
    category: "Baby Girl",
    image: images.babygirl1,
    description: "Beautiful party dress with tulle skirt and sparkly details. Perfect for birthdays and celebrations."
  },
  {
    id: "11",
    name: "Sweet Summer Outfit",
    price: 27.99,
    category: "Baby Girl",
    image: images.babygirl2,
    description: "Charming summer outfit with floral patterns. Lightweight and comfortable for warm weather."
  },
  {
    id: "12",
    name: "Cozy Winter Ensemble",
    price: 42.99,
    category: "Baby Girl",
    image: images.babygirl3,
    description: "Warm and stylish winter outfit with soft textures. Includes cardigan and matching accessories."
  }
];

// Mock Sellers Data (6 sellers)
export const sellers = [
  {
    id: "s1",
    name: "Fashion Forward",
    image: images.seller1,
    rating: 4.8,
    followers: 12500,
    isFollowing: false
  },
  {
    id: "s2", 
    name: "Style Studio",
    image: images.seller2,
    rating: 4.9,
    followers: 8750,
    isFollowing: true
  },
  {
    id: "s3",
    name: "Trendy Threads",
    image: images.seller3,
    rating: 4.7,
    followers: 15200,
    isFollowing: false
  },
  {
    id: "s4",
    name: "Chic Boutique", 
    image: images.seller4,
    rating: 4.6,
    followers: 9800,
    isFollowing: true
  },
  {
    id: "s5",
    name: "Urban Wear",
    image: images.seller5,
    rating: 4.8,
    followers: 11300,
    isFollowing: false
  },
  {
    id: "s6",
    name: "Kids Corner",
    image: images.seller6,
    rating: 4.9,
    followers: 7650,
    isFollowing: false
  }
];

// Categories for filtering
export const categories = [
  { id: 'all', name: 'All', value: 'All' },
  { id: 'men', name: 'Men', value: 'Men' },
  { id: 'women', name: 'Women', value: 'Women' },
  { id: 'baby-boy', name: 'Baby Boy', value: 'Baby Boy' },
  { id: 'baby-girl', name: 'Baby Girl', value: 'Baby Girl' }
];

// Sort options
export const sortOptions = [
  { id: 'price-asc', label: 'Price: Low to High', value: 'price-asc' },
  { id: 'price-desc', label: 'Price: High to Low', value: 'price-desc' },
  { id: 'name-asc', label: 'Name: A to Z', value: 'name-asc' },
  { id: 'name-desc', label: 'Name: Z to A', value: 'name-desc' }
];

// Carousel images for home screen
export const carouselImages = [
  images.women1,
  images.men2, 
  images.babygirl1
];

// Mock user data
export const mockUser = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  avatar: images.women1
};

// Mock liked orders for profile
export const likedOrders = [
  {
    id: "order1",
    product: products[0],
    orderDate: "2024-01-15",
    status: "Delivered"
  },
  {
    id: "order2", 
    product: products[3],
    orderDate: "2024-01-10",
    status: "In Transit"
  },
  {
    id: "order3",
    product: products[6],
    orderDate: "2024-01-05",
    status: "Delivered"
  }
];