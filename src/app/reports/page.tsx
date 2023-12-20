'use client'
import React, {useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {useDashboardStore} from "@/store/DashboardStore";
import Svg from "@/components/Svg";
import {ArrowLeft} from "@/assets/icons/ArrowLeft";
import ReportContent from "@/components/ReportContent";
import {useAuthHelper} from "@/hooks/useAuthEffect";
import {useUserStore} from "@/store/UserStore";
import {useTransactionStore} from "@/store/TransactionStore";

const ReportsPage: React.FC = () => {
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

    const [hasActivity, setHasActivity] = useState<boolean>(false);
    const [showEmptyState, setShowEmptyState] = useState<boolean>(false);
    const {transactions} = useTransactionStore();
    const {
        isAuthenticated,
        setIsAuthenticated,
    } = useUserStore();

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setHeaderTitle("Merchant Reports")
        setHeaderDescription("Explore detailed analytics of your transactions with our Merchant Reports.")
        setNavTitle('')
        setShowSupportButton(true)
        !transactions.length ? setShowEmptyState(true) : setHasActivity(true)
    }

    useAuthHelper({
        isAuthenticated,
        setHeaderDetails,
        setIsAuthenticated
    })

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

