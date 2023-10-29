import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    email: string;
    password: string;
    firstTimeLogin: boolean | null;
    accessKey: string | null;
}

const initialState: AuthState = {
    email: '',
    password: '',
    firstTimeLogin: null,
    accessKey: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState,
        setAuthUser: (state, action: PayloadAction<AuthState>) => {
            if (!action.payload.email || !action.payload.password)
                throw new Error('Invalid payload');
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                firstTimeLogin: action.payload.firstTimeLogin,
                accessKey: action.payload.accessKey,
            };
        },
    },
});

export const {setAuthUser, reset} = authSlice.actions;

export default authSlice.reducer;
