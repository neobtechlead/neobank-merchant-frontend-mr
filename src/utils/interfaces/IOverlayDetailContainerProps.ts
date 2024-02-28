import React from "react";

export interface IOverlayDetailContainerProps {
    open: boolean;
    handleOpen: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}