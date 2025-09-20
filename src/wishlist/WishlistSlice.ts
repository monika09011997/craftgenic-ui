import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { ProductListItem } from '../home/types';
import { RootState } from '../store';


interface WishlistState {
  items: ProductListItem[];
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // This single action adds an item if it's not there, or removes it if it is.
    toggleWishlistItem: (state, action: PayloadAction<ProductListItem>) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingIndex >= 0) {
        // Item exists, so remove it
        state.items.splice(existingIndex, 1);
      } else {
        // Item does not exist, so add it
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleWishlistItem } = wishlistSlice.actions;

// --- Selectors ---
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistItemCount = (state: RootState) => state.wishlist.items.length;
// Selector to check if a specific item is in the wishlist
export const selectIsinWishlist = (productId: string) => 
  createSelector(selectWishlistItems, (items) => 
    items.some(item => item.id === productId)
  );


export default wishlistSlice.reducer;