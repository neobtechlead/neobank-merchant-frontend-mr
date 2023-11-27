'use client'
import React, {useEffect, useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {useDashboardStore} from "@/store/DashboardStore";
import Svg from "@/components/Svg";
import {ArrowLeft} from "@/assets/icons/ArrowLeft";
import CollectionContent from "@/components/CollectionContent";
import ReportContent from "@/components/ReportContent";
import Status from "@/components/Status";
import {TransactionType} from "@/utils/types/TransactionType";

const ReportsPage: React.FC = () => {
    const description = "Comprehensive and data-driven documents that provide valuable insights and analytics to businesses and merchants. These reports are instrumental in tracking, analysing, and optimizing various aspects of financial transactions and operations, helping businesses make informed decisions and achieve their goals."

    const {
        setShowLogo,
        setShowBackButton,
        setShowNavigation,
        setHeaderTitle,
        setHeaderDescription,
    } = useDashboardStore();

    useEffect(() => {
        setHeaderDetails()
    }, [])

    const [hasActivity, setHasActivity] = useState<boolean>(false);
    const [showEmptyState, setShowEmptyState] = useState<boolean>(false);

    const transactions: TransactionType[] = [
        {
            id: '100000000',
            date: '15/08/2017',
            type: 'disbursement',
            channel: 'neobank',
            sender: 'Kwaku Frimpong',
            recipient: 'Kwaku Frimpong',
            phone: '+233 24 102 8900',
            amount: '6,908',
            status: 'successful',
            balance: '77,000'
        },
        {
            id: '100000000',
            date: '15/08/2017',
            type: 'disbursement',
            channel: 'neobank',
            sender: 'Kwaku Frimpong',
            recipient: 'Kwaku Frimpong',
            phone: '+233 24 102 8900',
            amount: '6,908',
            status: 'successful',
            balance: '77,000'
        },
        {
            id: '100000000',
            date: '15/08/2017',
            type: 'disbursement',
            channel: 'neobank',
            sender: 'Kwaku Frimpong',
            recipient: 'Kwaku Frimpong',
            phone: '+233 24 102 8900',
            amount: '6,908',
            status: 'successful',
            balance: '77,000'
        }
    ]

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setHeaderTitle('Merchant Reports')
        setHeaderDescription(description)
        !transactions.length ? setShowEmptyState(true) : setHasActivity(true)
    }

    return (
        <DashboardLayout>
            {{
                body: <ReportContent
                    hasActivity={hasActivity}
                    setHasActivity={setHasActivity}
                    showEmptyState={showEmptyState}
                    setShowEmptyState={setShowEmptyState}
                    transactions={transactions}
                />
            }}
        </DashboardLayout>
    );
};

export default ReportsPage;

