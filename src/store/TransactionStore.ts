import {create} from 'zustand'
import {TransactionType} from '@/utils/types/TransactionType'
import {TransactionStoreType} from "@/utils/types/TransactionStoreType";
import {devtools, persist} from 'zustand/middleware';

export const useTransactionStore = create<TransactionStoreType>()(
    devtools(
        persist(
            (set) => ({
                setTransaction: (transaction?: TransactionType) => set((state) => ({transaction: {...state.transaction, ...transaction}})),
                transaction: {},
                setTransactions: (transactions) => set((state) => ({...state, transactions})),
                transactions: [],
                setCollections: () => set((state) => ({
                        transactions: state.transactions.filter(
                            (transaction) => transaction.type?.toLowerCase() === 'collection'),
                    })
                ),
                collections: [],

                setDisbursements: () =>
                    set((state) => ({
                        transactions: state.transactions.filter(
                            (transaction) => transaction.type?.toLowerCase() === 'disbursement'),
                    })),
                disbursements: [],

                scheduledPayments: () => set((state) => ({
                    transactions: state.transactions.filter(
                        (transaction) => transaction.processAt && new Date(transaction.processAt) > new Date()
                    )
                })),
            }),
            {name: 'transaction'},
        ),
    ),
)
