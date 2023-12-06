import {TransactionType} from "@/utils/types/TransactionType";

export interface ICollectionContentProps {
    showPaymentLinkForm: boolean;
    showEmptyState: boolean;
    hasActivity: boolean;
    setShowPaymentLinkForm: (b: boolean) => void,
    setHasActivity: (b: boolean) => void,
    setShowEmptyState: (b: boolean) => void,
    transactions: TransactionType[],
}