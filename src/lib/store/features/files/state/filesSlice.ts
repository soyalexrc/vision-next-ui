import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "@/lib/store";

export interface PatientsState {
    filesUploading: boolean
}

const initialState: PatientsState = {
    filesUploading: false,
}

export const filesReducer = createSlice({
    name: 'files',
    initialState,
    reducers: {
        updateFilesUploadStatus: (state, action: PayloadAction<boolean>) => {
            state.filesUploading = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {updateFilesUploadStatus} = filesReducer.actions

export const selectStatusUploading = (state: RootState) => state.files.filesUploading

export default filesReducer.reducer
