'use client'
import React, {useEffect} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardContent from "@/components/DashboardContent";
import {useDashboardStore} from "@/store/DashboardStore";
import {usePathname} from "next/navigation";

const Overview: React.FC = () => {
    const path = usePathname();

    const {
        setShowLogo,
        setShowNavigation,
        setShowProfileDropdown,
        setHeaderTitle,
        setHeaderDescription
    } = useDashboardStore();

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowNavigation(true)
        setShowProfileDropdown(true)
        setHeaderTitle('Hello Complete Farmer');
        setHeaderDescription('Welcome to your dashboard');
    }

    useEffect(() => {
        if (path === '/overview') setHeaderDetails()
    }, [path])


    return (
        <DashboardLayout>
            {{body: <DashboardContent/>}}
        </DashboardLayout>
    );
};

export default Overview;

