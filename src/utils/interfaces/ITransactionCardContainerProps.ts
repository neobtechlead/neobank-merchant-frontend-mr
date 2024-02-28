import React from "react";
import {TransactionType} from "@/utils/types/TransactionType";

export interface ITransactionCardContainerProps {
    backgroundImage?: string,
    title?: string,
    data?: TransactionType[],
    emptyTitle?: string,
    emptyDescription?: string,
    children?: React.ReactNode
}