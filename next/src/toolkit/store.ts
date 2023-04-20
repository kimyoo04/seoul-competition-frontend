import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "@features/alert/alertSlice";
import educationReducer from "@features/education/educationSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    education: educationReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// useDispatch, useSelect를 사용할 때 필요
export type AppDispatch = typeof store.dispatch;
