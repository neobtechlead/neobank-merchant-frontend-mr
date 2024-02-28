import {TransactionType} from "@/utils/types/TransactionType";

export interface ITransactionConfirmation {
    transactionType?: string;
    transaction: TransactionType;
    summary?: {
        totalCount: number,
        totalUniqueCount: number,
        totalDuplicateCount: number,
        totalSuccessfulCount: number,
        totalAmount: number,
        totalFailedCount: number,
        totalPendingCount: number,
        totalTransactionValue: number,
        totalTransactionCount: number
    };
    customStyles?: string;
    enabled?: boolean;
    handleConfirmation: (transactionType: string | undefined) => void;
    handleCancel: (cancel: boolean) => void;
}