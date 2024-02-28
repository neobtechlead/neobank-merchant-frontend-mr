import React from "react";

export interface IAuthContentWrapper {
    title: string;
    description: string;
    error?: string;
    customClasses?: string;
    children?: React.ReactNode
}