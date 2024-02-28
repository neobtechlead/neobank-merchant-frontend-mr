import React from "react";

export interface IDisbursementActionContainer {
    title: string;
    description: string;
    customClasses?: string;
    open: boolean;
    handleOpen: (open: boolean) => void;
    children?: React.ReactNode;
}