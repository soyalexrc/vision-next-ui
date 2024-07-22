import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export interface FilesState {
  loading: Loading;
  imagesLoading: Loading;
  documentsLoading: Loading;
  propertyImages: string[];
  propertyDocuments: PropertyDocument[];
}

export type PropertyDocument = { name: string; fullPath: string };

type Loading = {
  text: string;
  status: boolean;
  type?: 'UPLOAD' | 'REMOVE';
};

const initialState: FilesState = {
  loading: {
    status: false,
    text: '',
    type: 'UPLOAD',
  },
  imagesLoading: {
    status: false,
    text: '',
  },
  documentsLoading: {
    status: false,
    text: '',
  },
  propertyImages: [],
  propertyDocuments: [],
};

export const filesReducer = createSlice({
  name: 'files',
  initialState,
  reducers: {
    activateLoading: (state, action: PayloadAction<{ text: string; type: 'UPLOAD' | 'REMOVE' }>) => {
      state.loading = {
        text: action.payload.text,
        status: true,
        type: action.payload.type,
      };
    },
    turnOffLoading: (state) => {
      state.loading = {
        text: '',
        status: false,
        type: 'UPLOAD',
      };
    },
    addImage: (state, action: PayloadAction<string>) => {
      if (state.propertyImages.find((img) => img === action.payload)) return;
      state.propertyImages.push(action.payload);
    },
    addDocument: (state, action: PayloadAction<PropertyDocument>) => {
      if (state.propertyDocuments.find((doc) => doc.fullPath === action.payload.fullPath)) return;
      state.propertyDocuments.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<string>) => {
      state.propertyImages.splice(state.propertyImages.indexOf(action.payload), 1);
    },
    removeDocument: (state, action: PayloadAction<PropertyDocument>) => {
      const docIndex = state.propertyDocuments.findIndex((doc) => doc.fullPath === action.payload.fullPath);
      state.propertyDocuments.splice(docIndex, 1);
    },
    wipeImagesAndDocuments: (state) => {
      state.propertyImages = [];
      state.propertyDocuments = [];
    },
    updateLoadingState: (state, action: PayloadAction<{ text: string; status: boolean; type: 'images' | 'documents' }>) => {
      if (action.payload.type === 'images') {
        state.imagesLoading = { text: action.payload.text, status: action.payload.status };
      } else {
        state.documentsLoading = { text: action.payload.text, status: action.payload.status };
      }
    },
    wipeLoadingState: (state) => {
      state.loading = { text: '', status: false };
      state.imagesLoading = { text: '', status: false };
      state.documentsLoading = { text: '', status: false };
    },
    reorderImages(state, action) {
      state.propertyImages = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  activateLoading,
  turnOffLoading,
  addImage,
  reorderImages,
  removeImage,
  updateLoadingState,
  wipeLoadingState,
  wipeImagesAndDocuments,
  addDocument,
  removeDocument,
} = filesReducer.actions;

export const selectPropertyImages = (state: RootState) => state.files.propertyImages;
export const selectPropertyDocuments = (state: RootState) => state.files.propertyDocuments;
export const selectStatusUploading = (state: RootState) => state.files.loading;
export const selectImagesLoading = (state: RootState) => state.files.imagesLoading;
export const selectDocumentsLoading = (state: RootState) => state.files.documentsLoading;

export default filesReducer.reducer;
