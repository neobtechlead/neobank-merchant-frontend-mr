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
                    collections: state.collections ? [collection, ...state?.collections] : [collection]
                })),
                collections: [],

                setDisbursements: (disbursements) => set({disbursements: disbursements ?? []}),
                setDisbursement: (disbursement: TransactionType) => set((state) => ({
                    disbursements: state.disbursements ? [disbursement, ...state?.disbursements] : [disbursement]
                })),
                disbursements: [],

                setScheduledPayments: (scheduledPayments) => set({scheduledPayments: scheduledPayments ?? []}),
                scheduledPayments: [],

                setTransactionSummary: (summary) => set({transactionSummary: summary ?? []}),
                transactionSummary: {},

                setLoading: (loading) => set({loading}),
                loading: false,
            }),
            {name: 'transaction'},
        ),
    ),
)
