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
                transactions: [
                    {
                        "externalId": "3cf37ccc-b766-4c1e-ba27-c34965ccbb63",
                        "amount": "1000",
                        "narration": "Payment for services",
                        "clientReference": "88a2f9c4-7466-4936-8a6d-695d1e63231c",
                        "accountIssuer": "NEO",
                        "accountNumber": "1234567890",
                        "initiatorName": "Heller - Runolfsson",
                        "callbackUrl": null,
                        "processAt": null,
                        "type": "DISBURSEMENT",
                        "status": "QUEUED",
                        "createdAt": "2023-10-24T21:01:57.720301",
                        "updatedAt": "2023-10-24T21:01:57.720301",
                        "balanceBefore": 0,
                        "balanceAfter": 9000,
                        "batchId": null
                    },
                ],
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
