import {create} from 'zustand'
import {UserType} from "@/utils/types/UserType";
import {UserStoreType} from "@/utils/types/UserStoreType";
import {MerchantType} from "@/utils/types/MerchantType";
import {devtools, persist} from 'zustand/middleware';

export const useUserStore = create<UserStoreType>()(
    devtools(
        persist(
            (set) => ({
                setUser: (user?: UserType) => set((state) => ({user: user})),
                user: {
                    externalId: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    verificationToken: '',
                    accessKey: '',
                    authToken: '',
                },
                setMerchant: (merchant?: MerchantType) => set((state) => ({merchant: merchant})),
                merchant: {
                    externalId: '',
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
