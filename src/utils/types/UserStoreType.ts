import {UserType} from "@/utils/types/UserType";
import {MerchantType} from "@/utils/types/MerchantType";
import {MonthlyTransactionSummaryType} from "@/utils/types/MonthlyTransactionSummaryType";

export type UserStoreType = {
    setUser?: (user?: UserType) => void,
    user?: UserType,
    setMerchant?: (merchant?: MerchantType) => void,
    merchant?: MerchantType,
    isAuthenticated?: boolean,
    setIsAuthenticated?: (isAuthenticated: boolean) => void,
}