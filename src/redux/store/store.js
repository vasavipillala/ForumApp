import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../reducer/postSlice";
import userReducer from "../reducer/userSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;
