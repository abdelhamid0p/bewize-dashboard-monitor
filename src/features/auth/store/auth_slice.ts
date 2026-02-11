import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: { email: string } | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action: PayloadAction<{ email: string }>) {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    logout() {
      return initialState
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions

export default authSlice.reducer
