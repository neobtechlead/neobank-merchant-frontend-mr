import {create} from 'zustand'
import {UserType} from "@/utils/types/UserType";
import {UserStoreType} from "@/utils/types/UserStoreType";
import {MerchantType} from "@/utils/types/MerchantType";
import {devtools, persist} from 'zustand/middleware';

export const useUserStore = create<UserStoreType>()(
    devtools(
        persist(
            (set) => ({
                setUser: (user?: UserType) => set((state) => ({user: {...state.user, ...user}})),
                user: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    verificationToken: '',
                    accessKey: '',
                    authToken: '',
                },
                setMerchant: (merchant?: MerchantType) => set((state) => ({user: {...state.merchant, ...merchant}})),
                merchant: {
                    externalId: 'b615555a-f190-4d03-a20b-0e5648efcb23',
                    email: '',
                    recentTransactions: [],
                    actualBalance: 0,
                    disbursementCount: 0,
                    collectionCount: 0,
                    collectionValue: 0,
                    disbursementValue: 0,
                    availableBalance: 0,
                    transactionCount: 0,
                    roles: [],
                    scheduledPayments: []
                }
            }),
            {name: 'user'},
        ),
    ),
)
