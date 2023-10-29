import {configureStore} from '@reduxjs/toolkit';
import authReducer from '@/redux/features/authSlice';
import merchantReducer from '@/redux/features/merchantSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        merchant: merchantReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
