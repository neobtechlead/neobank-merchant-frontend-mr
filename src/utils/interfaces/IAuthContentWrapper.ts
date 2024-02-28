import React from "react";

export interface IAuthContentWrapper {
    title: string;
    description: string;
    error?: string;
    children?: React.ReactNode
}