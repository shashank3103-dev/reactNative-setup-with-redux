import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  phone: string;
  student: boolean;
  tutor: boolean;
  admin: boolean;
  is_blocked: boolean;
  is_verified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: 'student' | 'tutor' | 'admin' | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        role: 'student' | 'tutor' | 'admin';
      }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setUserData, logout } = authSlice.actions;
export default authSlice.reducer;
