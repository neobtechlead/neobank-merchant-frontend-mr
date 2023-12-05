import {TransactionType} from "@/utils/types/TransactionType";

export type TransactionStoreType = {
    setTransaction: (transaction: TransactionType) => void,
    transaction: TransactionType,
    setTransactions: (transactions: TransactionType[]) => void
    transactions: TransactionType[],
    transactionsByType: (type: string) => void,
    setDisbursements?: () => void,
    disbursements?: TransactionType[],
    setCollections?: () => void,
    collections?: TransactionType[],
}