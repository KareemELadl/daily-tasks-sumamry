import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // No slices yet, we’re using React Query mainly
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
