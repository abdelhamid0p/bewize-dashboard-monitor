import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: { email: string } | null
  loading: boolean
  error: string | null
  initialized: boolean // Pour savoir si on a vérifié le token
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  initialized: false,
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
      state.initialized = true
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
      state.initialized = true
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.loading = false
      state.error = null
      // On garde initialized = true car on a bien vérifié
      state.initialized = true
    },
    restoreSession(state, action: PayloadAction<{ email: string } | null>) {
      state.initialized = true
      if (action.payload) {
        state.isAuthenticated = true
        state.user = action.payload
      }
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  restoreSession,
} = authSlice.actions

export default authSlice.reducer
