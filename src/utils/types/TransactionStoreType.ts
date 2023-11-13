import {TransactionType} from "@/utils/types/TransactionType";

export type DashboardStoreType = {
    actionType: string,
    setActionType: (action: string) => void,

    transaction: TransactionType,
    setTransaction: (transaction: TransactionType) => void,

    transactions: TransactionType[],
    setTransactions: (transactions: TransactionType[]) => void
}