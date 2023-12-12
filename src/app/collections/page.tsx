'use client'
import React, {useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {useDashboardStore} from "@/store/DashboardStore";
import Svg from "@/components/Svg";
import {ArrowLeft} from "@/assets/icons/ArrowLeft";
import CollectionContent from "@/components/CollectionContent";
import {useTransactionStore} from "@/store/TransactionStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";
import {useUserStore} from "@/store/UserStore";

const CollectionPage: React.FC = () => {
    const pageDescription = "Funds Collection is a vital process that involves gathering and consolidating financial contributions or payments from various sources or contributors. Whether you are managing donations for a non-profit organization, collecting payments for goods or services, or coordinating group contributions, efficient funds collection is key to financial success."
    const pageTitle = "Funds Collection"

    const {
        setShowLogo,
        showBackButton,
        navTitle,
        setShowBackButton,
        setShowNavigation,
        setHeaderTitle,
        setHeaderDescription,
        setNavTitle,
        setShowSupportButton
    } = useDashboardStore();

    const {
        collections
    } = useTransactionStore();

    const {
        isAuthenticated, setIsAuthenticated
    } = useUserStore();

    const [showPaymentLinkForm, setShowPaymentLinkForm] = useState<boolean>(false);
    const [hasActivity, setHasActivity] = useState<boolean>(false);
    const [showEmptyState, setShowEmptyState] = useState<boolean>(false);

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setHeaderTitle(pageTitle)
        setHeaderDescription(pageDescription)
        setNavTitle('')
        setShowSupportButton(true)
        setShowPaymentLinkForm(false)
    }

    useAuthHelper({
        isAuthenticated,
        setHeaderDetails,
        setIsAuthenticated
    })

    const handleBackButtonClicked = () => {
        setNavTitle('')
        setHeaderDetails()
        collections && collections.length > 0 ? setHasActivity(true) : setShowEmptyState(true)
    }

    return (
        <DashboardLayout>
            {{
                logo: showBackButton &&
                    (<div className="flex cursor-pointer gap-2 lg:pl-5" onClick={handleBackButtonClicked}>
                        <Svg fill="#4F4F4F" path={ArrowLeft}/> Back
                    </div>),
                navigationLinks: <span className="font-semibold">{navTitle}</span>,
                body: <CollectionContent
                    showPaymentLinkForm={showPaymentLinkForm}
                    setShowPaymentLinkForm={setShowPaymentLinkForm}
                    hasActivity={hasActivity}
                    setHasActivity={setHasActivity}
                    showEmptyState={showEmptyState}
                    setShowEmptyState={setShowEmptyState}
                />
            }}
        </DashboardLayout>
    );
};

export default CollectionPage;

