'use client'
import React, {useEffect, useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {useDashboardStore} from "@/store/DashboardStore";
import Svg from "@/components/Svg";
import {ArrowLeft} from "@/assets/icons/ArrowLeft";
import ReportContent from "@/components/ReportContent";
import {TransactionType} from "@/utils/types/TransactionType";

const ReportsPage: React.FC = () => {
    const pageDescription = "Comprehensive and data-driven documents that provide valuable insights and analytics to businesses and merchants. These reports are instrumental in tracking, analysing, and optimizing various aspects of financial transactions and operations, helping businesses make informed decisions and achieve their goals."
    const pageTitle = "Merchant Reports"
    const {
        showBackButton,
        navTitle,
        setShowLogo,
        setShowBackButton,
        setShowNavigation,
        setHeaderTitle,
        setHeaderDescription,
        setShowSupportButton,
        setNavTitle,
    } = useDashboardStore();

    useEffect(() => {
        setHeaderDetails()
    }, [])

    const [hasActivity, setHasActivity] = useState<boolean>(false);
    const [showEmptyState, setShowEmptyState] = useState<boolean>(false);

    const transactions: TransactionType[] = []

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setHeaderTitle(pageTitle)
        setHeaderDescription(pageDescription)
        setNavTitle('')
        setShowSupportButton(true)
        !transactions.length ? setShowEmptyState(true) : setHasActivity(true)
    }

    const handleBackButtonClicked = () => {
        setHeaderDetails()
    }

    return (
        <DashboardLayout>
            {{
                logo: showBackButton &&
                    (<div className="flex cursor-pointer gap-2 lg:pl-5" onClick={handleBackButtonClicked}>
                        <Svg fill="#4F4F4F" path={ArrowLeft}/> Back
                    </div>),
                navigationLinks: <span className="font-semibold">{navTitle}</span>,
                body: <ReportContent
                    hasActivity={hasActivity}
                    setHasActivity={setHasActivity}
                    showEmptyState={showEmptyState}
                    setShowEmptyState={setShowEmptyState}
                />
            }}
        </DashboardLayout>
    );
};

export default ReportsPage;

