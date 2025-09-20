

export type ProductListItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // URL or path to the product image
  category: string; // e.g., "art print", "canvas art"
  artist?: string; // Optional, if applicable
  rating?: number; // Optional, if you want to include ratings
  dimensions?: string; // Optional, e.g., "24x36 inches"
  availableSizes?: string[]; // Optional, e.g., ["Small", "Medium", "Large"]
  isFeatured?: boolean; // Optional, to mark featured products
  imageGallery?: string[]; // Optional, array of image URLs for gallery
  selectedSize?: string; // Optional, to track selected size
  selectedFrame?: string; // Optional, to track selected frame option
};
