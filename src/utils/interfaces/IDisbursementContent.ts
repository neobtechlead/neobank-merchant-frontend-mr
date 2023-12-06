import {TransactionType} from "@/utils/types/TransactionType";

export interface IDisbursementContent {
    showDisbursementActionContent?: boolean,
    setShowDisbursementActionContent?: (b: boolean) => void,
    hasActivity?: boolean,
    setHasActivity?: (b: boolean) => void,
    showEmptyState?: boolean,
    setShowEmptyState?: (b: boolean) => void,
    setDefaultScreens?: (b: boolean) => void,
    transactions: TransactionType[]
}