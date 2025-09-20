import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductListItem } from '../home/types'

import type { RootState } from '../store'

// Define a type for the slice state
interface ProductState {
    selectedProduct: ProductListItem | null
    selectedNavItem?: string
}

// Define the initial state using that type
const initialState: ProductState = {
  selectedProduct: null,
  selectedNavItem: 'HOME',
}

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   setSelectProduct: (state, action: PayloadAction<ProductListItem>) => {
      state.selectedProduct = action.payload
    },
    setSelectNavItem: (state, action: PayloadAction<string>) => {
      state.selectedNavItem = action.payload
    },
  }
})

export const { setSelectProduct, setSelectNavItem} = productSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectedProduct = (state: RootState) => state.product.selectedProduct
export const selectSelectedNavItem = (state: RootState) => state.product.selectedNavItem;

export default productSlice.reducer