import React from "react";
import {TransactionType} from "@/utils/types/TransactionType";

export interface IRecentTransactionCardProps {
    children?: React.ReactNode,
    transaction?: TransactionType,
    customStyles?: string
}