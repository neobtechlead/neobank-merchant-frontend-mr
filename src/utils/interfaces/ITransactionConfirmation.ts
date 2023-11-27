import {TransactionType} from "@/utils/types/TransactionType";

export interface ITransactionConfirmation {
    transactionType?: string;
    transaction: TransactionType;
    summary?: {
        count: string,
        duplicates: string,
        description: string,
        amount: string,
    };
    customStyles?: string;
    enabled?: boolean;
    handleConfirmation: (transactionType: string | undefined) => void;
    handleCancel: (cancel: boolean) => void;
}