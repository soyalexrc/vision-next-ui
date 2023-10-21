import {createContext, useState} from "react";

interface UiState {
    showToolbar: boolean;
}

const initialUiState: UiState = {
    showToolbar: true
}


export const UiContext = createContext<UiState>(initialUiState);

export default function UiProvider({children}: any) {
    const [uiState, setUiState] = useState<UiState>(initialUiState)

    const toggleToolbar = (value: boolean) => {
        setUiState({
            showToolbar: value,
        })
    }

    const value = {
        ...uiState,
        toggleToolbar
    }


    return (
        <UiContext.Provider value={value}>
            {children}
        </UiContext.Provider>
    )
}
