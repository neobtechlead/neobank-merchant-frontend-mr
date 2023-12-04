import {UserType} from "@/utils/types/UserType";
import {MerchantType} from "@/utils/types/MerchantType";

export type UserStoreType = {
    setUser?: (user?: UserType) => void,
    user?: UserType,
    setMerchant?: (merchant?: MerchantType) => void,
    merchant?: MerchantType,
}