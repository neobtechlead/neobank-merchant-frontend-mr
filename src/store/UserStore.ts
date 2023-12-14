import {create} from 'zustand'
import {UserType} from "@/utils/types/UserType";
import {UserStoreType} from "@/utils/types/UserStoreType";
import {MerchantType} from "@/utils/types/MerchantType";
import {devtools, persist} from 'zustand/middleware';

export const useUserStore = create<UserStoreType>()(
    devtools(
        persist(
            (set) => ({
                setUser: (user?: UserType) => set({user}),
                user: {},
                setMerchant: (merchant?: MerchantType) => set((state) => ({merchant: {...state.merchant, ...merchant}})),
                merchant: {},
                isAuthenticated: false,
                setIsAuthenticated: (isAuthenticated) => set({isAuthenticated}),
            }),
            {name: 'user'},
        ),
    ),
)
