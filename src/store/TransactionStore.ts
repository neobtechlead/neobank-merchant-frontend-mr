import {create} from 'zustand'
import {TransactionType} from '@/utils/types/TransactionType'
import {TransactionStoreType} from "@/utils/types/TransactionStoreType";
import {devtools, persist} from 'zustand/middleware';

export const useTransactionStore = create<TransactionStoreType>()(
    devtools(
        persist(
            (set) => ({
                setTransaction: (transaction?: TransactionType) => set({transaction}),
                transaction: {},
                setTransactions: (transactions) => set({transactions: transactions ?? []}),
                transactions: [],

                setCollections: (collections) => set({collections: collections ?? []}),
                setCollection: (collection: TransactionType) => set((state) => ({
                    collections: state.collections ? [...state?.collections, collection] : [collection]
                })),
                collections: [],

                setDisbursements: (disbursements) => set({disbursements: disbursements ?? []}),
                setDisbursement: (disbursement: TransactionType) => set((state) => ({
                    disbursements: state.disbursements ? [...state?.disbursements, disbursement] : [disbursement]
                })),
                disbursements: [],

                setScheduledPayments: (scheduledPayments) => set({scheduledPayments: scheduledPayments ?? []}),
                scheduledPayments: [],
            }),
            {name: 'transaction'},
        ),
    ),
)
