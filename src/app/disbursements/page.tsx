'use client'
import React, {useEffect, useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DisbursementContent from "@/components/DisbursementContent";
import {useDashboardStore} from "@/store/DashboardStore";
import Svg from "@/components/Svg";
import {ArrowLeft} from "@/assets/icons/ArrowLeft";
import {TransactionType} from "@/utils/types/TransactionType";

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

    useEffect(() => {
        setHeaderDetails()
    }, [])

    const [showDisbursementActionContent, setShowDisbursementActionContent] = useState<boolean>(false);

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
                body: <DisbursementContent showDisbursementActionContent={showDisbursementActionContent}
                                           setShowDisbursementActionContent={setShowDisbursementActionContent}/>
            }}
        </DashboardLayout>
    );
};

export default DisbursementPage;

