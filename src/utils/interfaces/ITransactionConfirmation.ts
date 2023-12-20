import {TransactionType} from "@/utils/types/TransactionType";

export interface ITransactionConfirmation {
    transactionType?: string;
    transaction: TransactionType;
    summary?: {
        totalCount: number,
        duplicates: number,
        totalAmount: number,
    };
    customStyles?: string;
    enabled?: boolean;
    handleConfirmation: (transactionType: string | undefined) => void;
    handleCancel: (cancel: boolean) => void;
}