import {AddressType} from "@/utils/types/AddressType";

export type MerchantType = {
    accountType?: string;
    address?: AddressType;
    businessName?: string;
    certificateOfIncorporation?: string;
    certificateOfRegistration?: string;
    constitutionByeLaws?: string;
    descriptionOfService?: string;
    externalId?: string;
    neobankAccountExternalId?: string;
    neobankAccountNumber?: string;
    phoneNumber?: string;
    taxClearanceCertificate?: string;
    tradingName?: string;
    actualBalance?: number;
    availableBalance?: number;
}