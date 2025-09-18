import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from './types';

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, logoutUser } = userSlice.actions;

// Selector to get the current user
export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;