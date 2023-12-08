import {TransactionType} from "@/utils/types/TransactionType";

export type TransactionStoreType = {
    setTransaction: (transaction: TransactionType) => void,
    transaction: TransactionType,
    setTransactions: (transactions: TransactionType[]) => void
    transactions: TransactionType[],
    setDisbursements?: (disbursements: TransactionType[]) => void,
    setDisbursement?: (disbursement: TransactionType) => void,
    disbursements?: TransactionType[],
    setCollections?: (collections: TransactionType[]) => void,
    setCollection?: (collection: TransactionType) => void,
    collections?: TransactionType[],
}