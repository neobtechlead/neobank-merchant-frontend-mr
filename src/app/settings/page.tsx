'use client'
import React from 'react';
import NavigationLinks from "@/components/navigation/NavigationLinks";
import ProfileDropdown from "@/components/profile/ProfileDropdown";
import Image from "next/image";
import Alert from "@/components/Alert";
import Link from "next/link";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Disbursement: React.FC = () => {
    const description = "Put content for account information here. Put content for account information here. Put content for account information here. Put content for account information here. Put content for account information here."

    return (
        <DashboardLayout headerTitle="Account Information" headerDescription={description}>
            Settings works!
        </DashboardLayout>
    );
};

export default Disbursement;

