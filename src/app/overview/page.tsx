'use client'
import React, {useEffect} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardContent from "@/components/DashboardContent";
import {useDashboardStore} from "@/store/DashboardStore";
import {usePathname} from "next/navigation";

const Overview: React.FC = () => {
    const path = usePathname();

    const merchant = {
        balance: '630,000.00',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
        lastInvoiceDate: '2022-12-13',
        amount: '$2,000.00',
        status: 'pending',
    };

    const transactionData = [
        {
            status: "Successful",
            batchNo: "Batch No. 5",
            amount: "GHS 60,000",
            date: "12/05/2023",
        },
        {
            status: "Successful",
            batchNo: "Batch No. 5",
            amount: "GHS 60,000",
            date: "12/05/2023",
        },
    ];
    const {
        setShowLogo,
        setShowNavigation,
        setShowProfileDropdown,
        setHeaderTitle,
        setHeaderDescription
    } = useDashboardStore();

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowNavigation(true)
        setShowProfileDropdown(true)
        setHeaderTitle('Hello Complete Farmer');
        setHeaderDescription('Welcome to your dashboard');
    }

    useEffect(() => {
        if (path === '/overview') setHeaderDetails()
    }, [path])


    return (
        <DashboardLayout>
            {{
                body: <DashboardContent transactionData={transactionData} merchant={merchant}/>
            }}
        </DashboardLayout>
    );
};

export default Overview;

