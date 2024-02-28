import React from "react";

export interface IReportContentProps {
    hasActivity: boolean;
    setHasActivity: (b: boolean) => void;
    showEmptyState: boolean;
    setShowEmptyState: (b: boolean) => void;
    customClasses?: string;
    children?: React.ReactNode
}