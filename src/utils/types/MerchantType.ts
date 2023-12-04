import {TransactionType} from "@/utils/types/TransactionType";

export type MerchantType = {
    externalId?: string;
    email?: string;
    recentTransactions?: TransactionType[];
    actualBalance?: number;
    disbursementCount?: number;
    collectionCount?: number;
    collectionValue?: number;
    disbursementValue?: number;
    availableBalance?: number;
    transactionCount?: number;
    roles?: string[];
}