'use client'
import React from 'react';
import NavigationLinks from "@/components/navigation/NavigationLinks";
import ProfileDropdown from "@/components/profile/ProfileDropdown";
import Image from "next/image";
import Alert from "@/components/Alert";
import Link from "next/link";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Disbursement: React.FC = () => {
    const description = "Disburse Funds is a powerful tool that allows you to efficiently transfer allocated funds to their intended recipients. Whether it's sending payments to vendors, distributing salaries to employees, or making withdrawals, this feature streamlines the process for you."

    return (
        <DashboardLayout headerTitle="Disburse Funds" headerDescription={description}>
            Disbursements works!
        </DashboardLayout>
    );
};

export default Disbursement;

