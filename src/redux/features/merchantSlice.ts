import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MerchantState {
    firstName: string;
    lastName: string;
    email: string;
    externalId: string;
    userExternalId: string;
    roles: string[];
    accountType: string;
    merchant: {
        businessName: string;
        externalId: string;
        tradingName: string;
        neobankAccountNumber: string;
        phoneNumber: string;
        address: {
            externalId: string;
            zipCode: string;
            city: string;
            country: string;
            poBox: string;
            state: string;
            streetAddress: string;
            digitalAddress: string | null;
        };
    };
}

const initialState: MerchantState = {
    firstName: "Elenora",
    lastName: "Green",
    email: "Tavares.Carroll@example.com",
    externalId: "be14c033-479a-4db0-8cc2-7e1887873edd",
    userExternalId: "35ea1765-3cf3-468a-acfc-06697a919056",
    roles: ["ADMIN"],
    accountType: "MERCHANT_ACCOUNT_HOLDER",
    merchant: {
        businessName: "Heller - Runolfsson",
        externalId: "b615555a-f190-4d03-a20b-0e5648efcb23",
        tradingName: "Rowe, O'Connell and Hilpert",
        neobankAccountNumber: "1000000053",
        phoneNumber: "0509677832",
        address: {
            externalId: "148511e5-f085-4ba7-84bc-cd5598d76ead",
            zipCode: "233",
            city: "Jaquelinefurt",
            country: "Northern Mariana Islands",
            poBox: "P.O.Box 398, Accra",
            state: "Greater Accra",
            streetAddress: "Oshie",
            digitalAddress: null
        }
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState,
        setAuthUser: (state, action: PayloadAction<Partial<MerchantState>>) => {
            if (!action.payload.email) {
                throw new Error('Invalid payload');
            }
            return {
                ...state,
                email: action.payload.email,
            };
        },
    },
});

export const {setAuthUser, reset} = authSlice.actions;

export default authSlice.reducer;
