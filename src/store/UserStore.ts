import {create} from 'zustand'
import {UserType} from "@/utils/types/UserType";
import {UserStoreType} from "@/utils/types/UserStoreType";
import {MerchantType} from "@/utils/types/MerchantType";
import {devtools, persist} from 'zustand/middleware';

export const useUserStore = create<UserStoreType>()(
    devtools(
        persist(
            (set) => ({
                setUser: (user?: UserType) => set({user: {...user}}),
                user: {},
                setMerchant: (merchant?: MerchantType) => set((state) => ({merchant: {...state.merchant, ...merchant}})),
                merchant: {
                    actualBalance: 0,
                    availableBalance: 0,
                },
                isAuthenticated: false,
                setIsAuthenticated: (isAuthenticated) => set({isAuthenticated}),
                resetUserStore: () => set({
                    user: {},
                    merchant: {
                        availableBalance: 0
                    },
                    isAuthenticated: false,
                }),
            }),
            {name: 'user'},
        ),
    ),
)
