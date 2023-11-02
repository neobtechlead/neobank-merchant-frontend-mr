'use client'
import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DisbursementContent from "@/components/DisbursementContent";

const DisbursementPage: React.FC = () => {
    const description = "Disburse Funds is a powerful tool that allows you to efficiently transfer allocated funds to their intended recipients. Whether it's sending payments to vendors, distributing salaries to employees, or making withdrawals, this feature streamlines the process for you."

    return (
        <DashboardLayout headerTitle="Disburse Funds" headerDescription={description}>
            <DisbursementContent/>
        </DashboardLayout>
    );
};

export default DisbursementPage;

