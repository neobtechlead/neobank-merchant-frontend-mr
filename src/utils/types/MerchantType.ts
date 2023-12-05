import {TransactionType} from "@/utils/types/TransactionType";
import {AddressType} from "@/utils/types/AddressType";

export type MerchantType = {
    externalId?: string;
    businessName?: string;
    tradingName?: string;
    neobankAccountNumber?: string;
    phoneNumber?: string;
    address?: AddressType;

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
    scheduledPayments?: TransactionType[]
}