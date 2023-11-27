import React from "react";
import {TransactionType} from "@/utils/types/TransactionType";

export interface IReportContentProps {
    hasActivity: boolean;
    setHasActivity: (b: boolean) => void;
    showEmptyState: boolean;
    setShowEmptyState: (b: boolean) => void;
    transactions: TransactionType[];
    customClasses?: string;
    children?: React.ReactNode
}