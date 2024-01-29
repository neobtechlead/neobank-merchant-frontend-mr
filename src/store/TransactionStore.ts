import {create} from 'zustand'
import {TransactionType} from '@/utils/types/TransactionType'
import {TransactionStoreType} from "@/utils/types/TransactionStoreType";
import {devtools, persist} from 'zustand/middleware';

export const useTransactionStore = create<TransactionStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setTransaction: (transaction?: TransactionType) => set({transaction}),
                transaction: {},
                setTransactions: (data) => set({transactions: data}),
                transactions: {
                    pagination: {
                        size: 0,
                        lastPage: false,
                        firstPage: true,
                        sorting: {
                            empty: true,
                            unsorted: false,
                            sorted: true,
                        },
                        totalPages: 0,
                        totalElements: 0
                    },
                    data: []
                },

                setCollections: (data) => set({collections: data}),
                setCollection: (collection: TransactionType) => set((state) => ({
                    collections: state.collections?.transactions?.length > 0
                        ? {
                            transactions: [collection, ...state.collections.transactions],
                            pagination: state.collections.pagination,
                        }
                        : {transactions: [collection], pagination: state.collections.pagination},
                })),

                collections: get()?.collections,

                setDisbursements: (data) => set({disbursements: data}),
                setDisbursement: (disbursement: TransactionType) => set((state) => ({
                    collections: state.disbursements?.transactions?.length > 0
                        ? {
                            transactions: [disbursement, ...state.disbursements.transactions],
                            pagination: state.disbursements.pagination,
                        }
                        : {transactions: [disbursement], pagination: state.disbursements.pagination},
                })),

                disbursements: get()?.disbursements,

                setScheduledPayments: (data) => set({scheduledPayments: data}),
                scheduledPayments: get()?.scheduledPayments,

                setTransactionSummary: (summary) => set({transactionSummary: summary ?? []}),
                transactionSummary: {},

                setLoading: (loading) => set({loading}),
                loading: false
            }),
            {name: 'transaction'},
        ),
    ),
)
