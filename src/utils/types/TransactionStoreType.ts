import {TransactionType} from "@/utils/types/TransactionType";

export type TransactionStoreType = {
    setTransaction: (transaction: TransactionType) => void,
    transaction: TransactionType,
    setTransactions: (transactions: TransactionType[]) => void
    transactions: TransactionType[],
    setDisbursements?: () => void,
    disbursements?: TransactionType[],
    setCollections?: () => void,
    collections?: TransactionType[],
}