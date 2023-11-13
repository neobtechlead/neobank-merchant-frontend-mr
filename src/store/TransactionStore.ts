import {create} from 'zustand'
import {TransactionType} from '@/utils/types/TransactionType'

export const useDashboardStore = create<TransactionType>((set) => ({
    actionType: 'single',
    setActionType: (actionType) => set((state) => ({...state, actionType})),

    transaction: {
        id: '',
        date: '',
        time: '',
        recipient: '',
        type: '',
        amount: '',
        status: '',
        reference: ''
    },
    setTransaction: (transaction) => set((state) => ({...state, transaction})),

    transactions: '',
    setTransactions: (transactions) => set((state) => ({...state, transactions})),
}))

