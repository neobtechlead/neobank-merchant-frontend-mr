import React from "react";

export interface IDashboardLayout {
    showNavigation: boolean;
    showHeader: boolean;
    customStyles?: string;
    headerStyles?: string;
    headerTitle: string;
    logoStyles?: string;
    headerDescription: string;
    children?: React.ReactNode;
}
