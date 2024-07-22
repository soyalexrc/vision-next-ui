import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export interface PropertyImagesState {
  images: string[];
  loading: {
    text: string;
    status: boolean;
  };
}

const initialState: PropertyImagesState = {
  images: [],
  loading: {
    status: false,
    text: '',
  },
};

export const propertyImagesReducer = createSlice({
  name: 'propertyImages',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      if (state.images.find((img) => img === action.payload)) return;
      state.images.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<string>) => {
      state.images.splice(state.images.indexOf(action.payload), 1);
    },
    wipeImages: (state) => {
      state.images = [];
    },
    updateLoadingState: (state, action: PayloadAction<{ text: string; status: boolean }>) => {
      state.loading = action.payload;
    },
    wipeLoadingState: (state) => {
      state.loading = { text: '', status: false };
    },
    reorderImages(state, action) {
      state.images = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addImage, reorderImages, removeImage, updateLoadingState, wipeLoadingState, wipeImages } = propertyImagesReducer.actions;

export const selectPropertyImages = (state: RootState) => state.propertyImages.images;
export const selectImagesLoading = (state: RootState) => state.propertyImages.loading;

export default propertyImagesReducer.reducer;
