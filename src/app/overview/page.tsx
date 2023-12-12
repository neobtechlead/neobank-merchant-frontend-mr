'use client'
import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {useDashboardStore} from "@/store/DashboardStore";
import {useUserStore} from "@/store/UserStore";
import Svg from "@/components/Svg";
import {ArrowLeft} from "@/assets/icons/ArrowLeft";
import OverviewContent from "@/components/OverviewContent";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const Overview: React.FC = () => {
    const {
        showBackButton,
        navTitle,
        setShowLogo,
        setShowNavigation,
        setShowProfileDropdown,
        setHeaderTitle,
        setHeaderDescription,
        setShowBackButton,
        setNavTitle,
        setShowSupportButton,
    } = useDashboardStore();
    const {isAuthenticated, setIsAuthenticated} = useUserStore();

    const {user} = useUserStore();
    const pageTitle = `Hello ${user?.firstName} ${user?.lastName}`;
    const pageDescription = 'Welcome to your dashboard';

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowNavigation(true)
        setShowProfileDropdown(true)
        setShowBackButton(false)
        setHeaderTitle(pageTitle);
        setHeaderDescription(pageDescription);
        setNavTitle('')
        setShowSupportButton(true)
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
                body: <OverviewContent/>
            }}
        </DashboardLayout>
    );
};

export default Overview;

