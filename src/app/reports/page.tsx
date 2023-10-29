'use client'
import React from 'react';
import NavigationLinks from "@/components/navigation/NavigationLinks";
import ProfileDropdown from "@/components/profile/ProfileDropdown";
import Image from "next/image";
import Alert from "@/components/Alert";
import Link from "next/link";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Disbursement: React.FC = () => {
    const headerStyle = {
        background: 'url("/assets/images/cyan-background.svg")',
        height: 147,
    };

    return (
        <DashboardLayout headerTitle="Hello Complete Farmer" headerDescription="Welcome to your dashboard">
            Reports works!
        </DashboardLayout>
    );
};

export default Disbursement;

