import {TransactionType} from "@/utils/types/TransactionType";

export interface ICollectionForm {
    onSubmit: (formData: TransactionType) => void;
}