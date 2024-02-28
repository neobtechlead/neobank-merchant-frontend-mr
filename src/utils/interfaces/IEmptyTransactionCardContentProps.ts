import React from "react";
import {TransactionType} from "@/utils/types/TransactionType";

export interface IEmptyTransactionCardContentProps {
    backgroundImage?: string,
    title?: string,
    description?: string,
    showContent: boolean,
    iconPath?: string,
    iconWidth?: number,
    iconHeight?: number,
    iconCustomStyle?: string,
    customStyles?: string,
    children?: React.ReactNode,
    data?: [],
    emptyTitle?: string,
    emptyDescription?: string,
}