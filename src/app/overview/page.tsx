'use client'
import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/Dashboard";

const Overview: React.FC = () => {
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


    return (
        <DashboardLayout headerTitle="Hello Complete Farmer" headerDescription="Welcome to your dashboard">
            <Dashboard transactionData={transactionData} merchant={merchant}/>
        </DashboardLayout>
    );
};

export default Overview;

