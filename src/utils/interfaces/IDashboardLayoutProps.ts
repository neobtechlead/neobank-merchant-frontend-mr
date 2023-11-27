import React from "react";

export interface IDashboardLayoutProps {
    customStyles?: string;
    headerStyles?: string;
    logoStyles?: string;
    children: {
        logo?: React.ReactNode;
        navigationLinks?: React.ReactNode;
        profileDropdown?: React.ReactNode;
        body: React.ReactNode;
    }
}
