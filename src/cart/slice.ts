import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { ProductListItem } from '../home/types';

import { RootState } from '../store'; // Adjust the import path as necessary
// Define the shape of a single item in the cart
export interface CartItem extends ProductListItem {
  quantity: number;
}

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add an item to the cart
    addItem: (state, action: PayloadAction<ProductListItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Action to completely remove an item
    removeItem: (state, action: PayloadAction<string>) => { // payload is the item id
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Action to increase quantity
    incrementQuantity: (state, action: PayloadAction<string>) => { // payload is the item id
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // Action to decrease quantity
    decrementQuantity: (state, action: PayloadAction<string>) => { // payload is the item id
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // If quantity is 1, decrementing removes the item
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
    state.items = [];
  },
  },
});

// Export the actions
export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

// --- Selectors ---
// Selectors are used to efficiently get data from the store
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);


export default cartSlice.reducer;