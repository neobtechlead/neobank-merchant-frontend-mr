import {MerchantType} from "@/utils/types/MerchantType";
import {TransactionType} from "@/utils/types/TransactionType";

export interface IOverviewProps {
    merchant: MerchantType
    transactions: TransactionType[],
}