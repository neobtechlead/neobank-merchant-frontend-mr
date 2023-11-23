'use client'
import React, {useEffect, useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {useDashboardStore} from "@/store/DashboardStore";
import Svg from "@/components/Svg";
import {ArrowLeft} from "@/assets/icons/ArrowLeft";
import CollectionContent from "@/components/CollectionContent";

const CollectionPage: React.FC = () => {
    const description = "Funds Collection is a vital process that involves gathering and consolidating financial contributions or payments from various sources or contributors. Whether you are managing donations for a non-profit organization, collecting payments for goods or services, or coordinating group contributions, efficient funds collection is key to financial success."

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

    const [collectionNavTitle, setCollectionNavTitle] = useState<string>('');
    const [showPaymentLinkForm, setShowPaymentLinkForm] = useState<boolean>(false);
    const [hasActivity, setHasActivity] = useState<boolean | null>(false);
    const [showEmptyState, setShowEmptyState] = useState<boolean | null>(false);

    const transactions = [
        // {
        //     id: '100000000',
        //     date: '15/08/2017',
        //     client: 'Kwaku Frimpong',
        //     amount: '6,908',
        //     status: 'pending',
        //     reference: 'Payment to a single individual'
        // },
        // {
        //     id: '100000001',
        //     date: '15/08/2017',
        //     client: 'Kwaku Frimpong',
        //     amount: '6,708',
        //     status: 'pending',
        //     reference: 'Payment to a single individual'
        // },
        // {
        //     id: '100000002',
        //     date: '15/08/2017',
        //     recipient: 'Kwaku Frimpong',
        //     amount: '3,908',
        //     status: 'pending',
        //     reference: 'Payment to a single individual'
        // },
    ]

    const setHeaderDetails = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setHeaderTitle('Funds Collection')
        setHeaderDescription(description)
        setCollectionNavTitle('')
        setShowPaymentLinkForm(false)
        !transactions.length ? setShowEmptyState(true) : setHasActivity(true)
    }

    return (
        <DashboardLayout>
            {{
                logo: showBackButton &&
                    (<div className="flex cursor-pointer gap-2 lg:pl-5" onClick={setHeaderDetails}>
                        <Svg fill="#4F4F4F" path={ArrowLeft}/> Back
                    </div>),
                navigationLinks: <span className="font-semibold">{collectionNavTitle}</span>,
                body: <CollectionContent showPaymentLinkForm={showPaymentLinkForm}
                                         setShowPaymentLinkForm={setShowPaymentLinkForm}
                                         hasActivity={hasActivity}
                                         setHasActivity={setHasActivity}
                                         showEmptyState={showEmptyState}
                                         setShowEmptyState={setShowEmptyState}
                                         transactions={transactions}
                                         setCollectionNavTitle={setCollectionNavTitle}
                                         setDefaultScreens={setHeaderDetails}/>
            }}
        </DashboardLayout>
    );
};

export default CollectionPage;

