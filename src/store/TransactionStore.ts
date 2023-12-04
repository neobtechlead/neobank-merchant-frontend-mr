import {create} from 'zustand'
import {TransactionType} from '@/utils/types/TransactionType'
import {TransactionStoreType} from "@/utils/types/TransactionStoreType";
import {UserType} from "@/utils/types/UserType";

export const useTransactionStore = create<TransactionStoreType>((set) => ({
    setTransaction: (transaction?: TransactionType) => set((state) => ({transaction: {...state.transaction, ...transaction}})),
    transaction: {},
    setTransactions: (transactions) => set((state) => ({...state, transactions})),
    transactions: [],
}))

