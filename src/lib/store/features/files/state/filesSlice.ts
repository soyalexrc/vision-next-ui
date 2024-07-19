import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export interface PatientsState {
  loading: Loading;
}

type Loading = {
  text: string;
  status: boolean;
  type: 'UPLOAD' | 'REMOVE';
};

const initialState: PatientsState = {
  loading: {
    status: false,
    text: '',
    type: 'UPLOAD',
  },
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
  },
});

// Action creators are generated for each case reducer function
export const { activateLoading, turnOffLoading } = filesReducer.actions;

export const selectStatusUploading = (state: RootState) => state.files.loading;

export default filesReducer.reducer;
