import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/store/auth_slice'
import { baseApi } from '@/shared/services/baseApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
