import {CollectionFormDataType} from "@/utils/types/CollectionFormDataType";

export interface ICollectionForm {
    onSubmit: (formData: CollectionFormDataType) => void;
}