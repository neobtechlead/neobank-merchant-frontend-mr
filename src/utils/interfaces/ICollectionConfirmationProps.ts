import {TransactionType} from "@/utils/types/TransactionType";

export interface ICollectionConfirmationProps {
    customStyles?: string;
    transaction: TransactionType,
    handleConfirmation: () => void,
    handleCancel: (cancel: boolean) => void,
}