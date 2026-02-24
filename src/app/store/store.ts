import { configureStore } from "@reduxjs/toolkit";
import { ordersReducer } from "@/features/orders/application/orders.slice";
import { HttpOrdersRepository } from "@/features/orders/infrastructure/httpOrdersRepository";

const ordersRepository = new HttpOrdersRepository();

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          ordersRepository,
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
