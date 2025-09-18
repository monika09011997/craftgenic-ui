import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import productReducer from './common/productSlice'
import cartReducer from './cart/slice'
import userReducer from './common/userSlice'

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
})

// Configuration for redux-persist
const persistConfig = {
  key: 'root',      // The key for the root of the storage
  storage,          // The storage engine (localStorage)
  whitelist: ['user', 'cart'], // ONLY the 'user' and 'cart' slices will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // This middleware is required to avoid errors with redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);


// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']