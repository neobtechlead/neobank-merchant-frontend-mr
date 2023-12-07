import {TransactionType} from "@/utils/types/TransactionType";

export type TransactionStoreType = {
    setTransaction: (transaction: TransactionType) => void,
    transaction: TransactionType,
    setTransactions: (transactions: TransactionType[]) => void
    transactions: TransactionType[],
    setDisbursements?: (disbursements: TransactionType[]) => void,
    disbursements?: TransactionType[],
    setCollections?: (collections: TransactionType[]) => void,
    collections?: TransactionType[],
}