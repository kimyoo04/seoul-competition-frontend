import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "@features/alert/alertSlice";
import searchReducer from "@features/search/searchSlice";
import sidebarReducer from "@features/sidebar/sidebarSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    search: searchReducer,
    sidebar: sidebarReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// useDispatch, useSelect를 사용할 때 필요
export type AppDispatch = typeof store.dispatch;
