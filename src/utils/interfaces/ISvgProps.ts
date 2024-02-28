import React from "react";

export interface ISvgProps {
    width?: number;
    height?: number;
    fill: string;
    style?: React.CSSProperties;
    path: string;
    customClasses?: string;
    custom?: boolean;
    children?: React.ReactNode;
}