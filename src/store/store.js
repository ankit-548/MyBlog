import {configureStore} from '@reduxjs/toolkit';
import reducers from './authSlice'

export const store = configureStore({
    reducer: reducers
});