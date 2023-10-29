'use client'
import React from 'react';
import NavigationLinks from "@/components/navigation/NavigationLinks";
import ProfileDropdown from "@/components/profile/ProfileDropdown";
import Image from "next/image";
import Alert from "@/components/Alert";
import Link from "next/link";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Disbursement: React.FC = () => {
    const description = "Funds Collection is a vital process that involves gathering and consolidating financial contributions or payments from various sources or contributors. Whether you are managing donations for a non-profit organization, collecting payments for goods or services, or coordinating group contributions, efficient funds collection is key to financial success."

    return (
        <DashboardLayout headerTitle="Funds Collection" headerDescription={description}>
            Collections works!
        </DashboardLayout>
    );
};

export default Disbursement;

