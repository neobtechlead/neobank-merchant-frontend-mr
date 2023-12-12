'use client'
import React, {useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DisbursementContent from "@/components/DisbursementContent";
import {useDashboardStore} from "@/store/DashboardStore";
import Svg from "@/components/Svg";
import {ArrowLeft} from "@/assets/icons/ArrowLeft";
import {useTransactionStore} from "@/store/TransactionStore";
import {useUserStore} from "@/store/UserStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const DisbursementPage: React.FC = () => {
    const pageDescription = "Disburse Funds is a powerful tool that allows you to efficiently transfer allocated funds to their intended recipients. Whether it's sending payments to vendors, distributing salaries to employees, or making withdrawals, this feature streamlines the process for you."
    const pageTitle = 'Disburse Funds';

    const {
        setShowLogo,
        showBackButton,
        navTitle,
        setShowBackButton,
        setShowNavigation,
        setHeaderTitle,
        setHeaderDescription,
        setNavTitle,
        setShowSupportButton,
    } = useDashboardStore();

    const {disbursements} = useTransactionStore();
    const {
        isAuthenticated,
        setIsAuthenticated,
    } = useUserStore();

    const [showDisbursementActionContent, setShowDisbursementActionContent] = useState<boolean>(false);
    const [hasActivity, setHasActivity] = useState<boolean>(false);
    const [showEmptyState, setShowEmptyState] = useState<boolean>(false);

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setHeaderTitle(pageTitle)
        setHeaderDescription(pageDescription)
        setNavTitle('')
        setShowDisbursementActionContent(false)
        setShowSupportButton(true)
    }

    useAuthHelper({
        isAuthenticated,
        setHeaderDetails,
        setIsAuthenticated
    })

    const handleBackButtonClicked = () => {
        setHeaderDetails()
        disbursements && disbursements.length > 0 ? setHasActivity(true) : setShowEmptyState(true)
    }

    return (
        <DashboardLayout>
            {{
                logo: showBackButton &&
                    (<div className="flex cursor-pointer gap-2 lg:pl-5" onClick={handleBackButtonClicked}>
                        <Svg fill="#4F4F4F" path={ArrowLeft}/> Back
                    </div>),
                navigationLinks: <span className="font-semibold">{navTitle}</span>,
                body: <DisbursementContent
                    showDisbursementActionContent={showDisbursementActionContent}
                    setShowDisbursementActionContent={setShowDisbursementActionContent}
                    hasActivity={hasActivity}
                    setHasActivity={setHasActivity}
                    showEmptyState={showEmptyState}
                    setShowEmptyState={setShowEmptyState}
                />
            }}
        </DashboardLayout>
    );
};

export default DisbursementPage;

