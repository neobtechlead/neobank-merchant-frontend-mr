import {TransactionType} from "@/utils/types/TransactionType";
import {MonthlyTransactionSummaryType} from "@/utils/types/MonthlyTransactionSummaryType";

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
    setScheduledPayments?: (scheduledPayments: TransactionType[]) => void,
    scheduledPayments?: TransactionType[],
    setTransactionSummary?: (summary: MonthlyTransactionSummaryType) => void,
    transactionSummary?: MonthlyTransactionSummaryType,
    setLoading?: (loading: boolean) => void,
    loading?: boolean,
}