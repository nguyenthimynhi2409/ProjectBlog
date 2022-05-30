import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
    }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()