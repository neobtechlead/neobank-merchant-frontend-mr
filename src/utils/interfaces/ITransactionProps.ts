import React from "react";
import {TransactionType} from "@/utils/types/TransactionType";

export interface ITransactionDetailProps {
    transaction: TransactionType;
    customClasses?: string;
    children?: React.ReactNode
}