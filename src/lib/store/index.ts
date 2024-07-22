import { configureStore } from '@reduxjs/toolkit';
import filesReduces from '@/lib/store/features/files/state/filesSlice';
import propertyImagesReducer from '@/lib/store/features/propertyImages/state/propertyImagesSlice';

export const store = configureStore({
  reducer: {
    files: filesReduces,
    propertyImages: propertyImagesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
