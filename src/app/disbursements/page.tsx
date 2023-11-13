'use client'
import React, {useEffect, useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DisbursementContent from "@/components/DisbursementContent";
import {useDashboardStore} from "@/store/DashboardStore";
import Svg from "@/components/Svg";
import {ArrowLeft} from "@/assets/icons/ArrowLeft";

const DisbursementPage: React.FC = () => {
    const description = "Disburse Funds is a powerful tool that allows you to efficiently transfer allocated funds to their intended recipients. Whether it's sending payments to vendors, distributing salaries to employees, or making withdrawals, this feature streamlines the process for you."

    const {
        setShowLogo,
        showBackButton,
        setShowBackButton,
        setShowNavigation,
        setHeaderTitle,
        setHeaderDescription,
    } = useDashboardStore();

    useEffect(() => {
        setHeaderDetails()
    }, [])

    const [disbursementType, setDisbursementType] = useState<string>('');
    const [showDisbursementActionContent, setShowDisbursementActionContent] = useState<boolean>(false);
    const [hasActivity, setHasActivity] = useState<boolean | null>(false);
    const [showEmptyState, setShowEmptyState] = useState<boolean | null>(false);

    const transactions = [
        {
            id: '100000000',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            batchNumber: 'Batch No. 1',
            type: 'single',
            amount: '6,908',
            status: 'successful',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        },
        {
            id: '100000001',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            batchNumber: 'Batch No. 1',
            type: 'bulk',
            amount: '6,908',
            status: 'completed',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        },
        {
            id: '100000002',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            batchNumber: 'Batch No. 1',
            type: 'single',
            amount: '6,908',
            status: 'failed',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        },
        {
            id: '100000005',
            date: '15/08/2017',
            batchNumber: 'Batch no. 7',
            type: 'bulk',
            amount: '6,908',
            status: 'in progress',
            phone: '0200000000',
            reference: 'Payment to a bulk individuals'
        }
    ]

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setHeaderTitle('Disburse Funds')
        setHeaderDescription(description)
        setDisbursementType('')
        setShowDisbursementActionContent(false)
        !transactions.length ? setShowEmptyState(true) : setHasActivity(true)
    }

    return (
        <DashboardLayout>
            {{
                logo: showBackButton &&
                    (<div className="flex cursor-pointer gap-2 lg:pl-5" onClick={setHeaderDetails}>
                        <Svg fill="#4F4F4F" path={ArrowLeft}/> Back
                    </div>),
                navigationLinks: <span className="font-semibold">{disbursementType}</span>,
                body: <DisbursementContent showDisbursementActionContent={showDisbursementActionContent}
                                           setShowDisbursementActionContent={setShowDisbursementActionContent}
                                           hasActivity={hasActivity}
                                           setHasActivity={setHasActivity}
                                           showEmptyState={showEmptyState}
                                           setShowEmptyState={setShowEmptyState}
                                           transactions={transactions}
                                           setDisbursementType={setDisbursementType}
                                           setDefaultScreens={setHeaderDetails}/>
            }}
        </DashboardLayout>
    );
};

export default DisbursementPage;

