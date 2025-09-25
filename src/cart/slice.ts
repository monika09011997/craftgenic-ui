

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductListItem } from '../home/types';
import { RootState } from '../store';

// Define the shape of a single item in the cart
export interface CartItem extends ProductListItem {
  cartItemId: string; // A unique ID for the product + size + frame combination
  quantity: number;
  selectedSize: string;
  selectedFrame: string;
}

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
}

// Set the initial state for the cart
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action: PayloadAction<Omit<CartItem, 'cartItemId' | 'quantity'>>) => {
      const newItem = action.payload;
      // 1. Create a unique composite ID from the product ID, size, and frame
      const cartItemId = `${newItem.id}-${newItem.selectedSize}-${newItem.selectedFrame}`;

      // 2. Check if an item with this exact configuration already exists
      const existingItem = state.items.find(item => item.cartItemId === cartItemId);

      if (existingItem) {
        // 3. If it exists, just increment its quantity
        existingItem.quantity++;
      } else {
        // 4. If it's a new configuration, add it as a new item to the cart
        state.items.push({
          ...newItem,
          cartItemId: cartItemId, // Add the new composite ID
          quantity: 1,            // Start with a quantity of 1
        });
      }
    },

    // Reducer to remove an item completely
    removeItem: (state, action: PayloadAction<{ cartItemId: string }>) => {
      state.items = state.items.filter(item => item.cartItemId !== action.payload.cartItemId);
    },

    // Reducer to update the quantity of a specific item
    updateQuantity: (state, action: PayloadAction<{ cartItemId: string; quantity: number }>) => {
      const { cartItemId, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.cartItemId === cartItemId);

      if (itemToUpdate) {
        if (quantity > 0) {
          itemToUpdate.quantity = quantity;
        } else {
          // If quantity is 0 or less, remove the item
          state.items = state.items.filter(item => item.cartItemId !== cartItemId);
        }
      }
    },
        clearCart: (state) => {
    state.items = [];
  },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

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