'use client'
import React, {useEffect, useState} from 'react';
import Card from "@/components/Card";
import Image from "next/image";
import EmptyTransactionCardContent from "@/components/EmptyTransactionCardContent";
import Svg from "@/components/Svg";
import {EyeClosedFilled, EyeOpenedFilled} from '@/assets/icons/eye-filled';
import {Asterisk} from '@/assets/icons/asterisk';
import ReBarGraph from "@/components/charts/ReBarGraph";
import ReAreaGraph from "@/components/charts/ReAreaGraph";
import TabsNav from "@/components/navigation/TabsNav";
import {useTransactionStore} from "@/store/TransactionStore";
import {useUserStore} from "@/store/UserStore";
import {getStats, getTransactionSummary} from "@/api/overview";
import InfoCardItem from "@/components/InfoCardItem";
import RecentTransactionCard from "@/components/RecentTransactionCard";
import {UserCircleFill} from "@/assets/icons/UserCircleFill";
import {LineArrowRight} from "@/assets/icons/LineArrowRight";
import {UsersColorFill} from "@/assets/icons/UsersColorFill";
import {
    calculateDateRange,
    extractPaginationData,
    formatAmount,
    formatAmountGHS, formatRelativeTime,
    plotGraphData, splitDateAndTime
} from "@/utils/lib";
import {TransactionGraphDataType} from "@/utils/types/TranasctionGraphDataType";
import {listTransactions} from "@/api/transaction";
import {TransactionType} from "@/utils/types/TransactionType";
import {listDisbursements, listScheduledPayments} from "@/api/disbursement";
import {listCollections} from "@/api/collection";
import {Calendar} from "@/assets/icons/Calendar";
import {now} from "d3-timer";

const OverviewContent: React.FC = () => {
    const [showBalance, setShowBalance] = useState<boolean | null>(true);
    const [activeNav, setActiveNav] = useState<string>('collections');
    const [recentScheduledPayment, setRecentScheduledPayment] = useState<TransactionType | null>(null);
    const [recentTransactions, setRecentTransactions] = useState<TransactionType[] | null>([]);
    const [relativeTime, setRelativeTime] = useState<string>('');

    const {
        transactions,
        disbursements,
        setTransactions,
        transactionSummary,
        setTransactionSummary,
        scheduledPayments,
        setScheduledPayments,
        setDisbursements,
        setCollections
    } = useTransactionStore()
    const {merchant, setMerchant, user} = useUserStore()

    const getMerchantStats = () => {
        getStats(merchant?.externalId, user?.authToken)
            .then(async (response) => {
                const statistics = (await response.json()).data
                if (response.ok) {
                    if (setMerchant) return setMerchant({
                        actualBalance: statistics.actualBalance,
                        availableBalance: statistics.availableBalance,
                    });
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const fetchTransactionSummary = () => {
        const {startDate, endDate} = calculateDateRange(6, true);
        getTransactionSummary(merchant?.externalId, user?.authToken, startDate ?? '', endDate ?? '')
            .then(async (response) => {
                const summary = await response.json()

                if (response.ok && typeof summary.data === 'object' && summary.data !== null) {
                    if (setTransactionSummary) return setTransactionSummary(summary.data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchTransactions = () => {
        listTransactions(merchant?.externalId, user?.authToken)
            .then(async (response) => {
                if (response.ok) {
                    const feedback = (await response.json());
                    const {transactions} = feedback.data
                    const pagination = extractPaginationData(feedback.data)
                    if (transactions.length > 0) {
                        if (setTransactions) setTransactions({pagination, data: [...transactions]})
                        setRecentTransactions(transactions)
                    }
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const fetchScheduledPayments = () => {
        listScheduledPayments(merchant?.externalId, user?.authToken)
            .then(async (response) => {
                const feedback = (await response.json());
                if (response.ok) {
                    const {transactions} = feedback.data
                    const pagination = extractPaginationData(feedback.data)

                    if (transactions.length > 0) {
                        getRecentScheduledBulkPayment()
                        if (setScheduledPayments) setScheduledPayments({pagination, transactions});
                    }
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const getRecentScheduledBulkPayment = () => {
        if (disbursements && disbursements.transactions) {
            const now = new Date();

            const scheduledBulkTransactions = disbursements.transactions
                .filter(disbursement => disbursement.processAt !== null && new Date(disbursement.processAt ?? now) > now);

            const sortedTransactions = scheduledBulkTransactions
                .sort((a, b) => {
                    const dateA = new Date(a.processAt ?? now).getMilliseconds();
                    const dateB = new Date(b.processAt ?? now).getMilliseconds();
                    return dateA - dateB;
                });

            return setRecentScheduledPayment(sortedTransactions.length > 0 ? sortedTransactions[0] : null);
        }
    }


    const fetchDisbursements = () => {
        listDisbursements(merchant?.externalId, user?.authToken, '')
            .then(async (response) => {
                if (response.ok) {
                    const feedback = await response.json();
                    const {transactions} = feedback.data
                    const pagination = extractPaginationData(feedback.data)
                    if (setDisbursements) setDisbursements({pagination, transactions});
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const fetchCollections = () => {
        listCollections(merchant?.externalId, user?.authToken, '')
            .then(async (response) => {
                if (response.ok) {
                    const feedback = await response.json();
                    const {transactions} = feedback.data
                    const pagination = extractPaginationData(feedback.data)
                    if (setCollections) setCollections({pagination, transactions});
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    useEffect(() => {
        getMerchantStats()
        fetchTransactionSummary()
        fetchTransactions()
        fetchScheduledPayments()
        fetchDisbursements()
        fetchCollections()
        getRelativeTime()
    }, []);

    const handleToggleBalance = () => {
        setShowBalance(!showBalance);
    }

    const asterisks = (count: number) =>
        Array.from({length: count}).map((_, index) => (
            <Svg key={index} path={Asterisk} fill="#FEFEFE"/>
        ));

    const getDataOptions = [
        {key: 'collections', color: '#652D90'},
        {key: 'disbursements', color: '#59D3D4'}
    ];

    const {volume, value} = plotGraphData(transactionSummary)
    const barGraphData: TransactionGraphDataType[] = volume
    const areaGraphData: TransactionGraphDataType[] = value
    const emptyDisbursementDescription = "Perform disbursements to view recent disbursement"
    const emptyTransactionDescription = "Perform a transaction to view recent transactions"
    const transactionDescription = "Perform a transaction to see your total counts"

    const handleNavClick = (activeTab: string) => {
        setActiveNav(activeTab)
    }

    const getRelativeTime = () => {
        setInterval(() => {
            setRelativeTime(formatRelativeTime(recentScheduledPayment?.processAt ?? ''))
        }, 1000);
    }

    return (
        <div className="m-5">
            <div className="flex flex-col lg:flex-row items-start justify-between md:gap-4">
                <div className="w-full lg:w-1/3 lg:col-span-12">
                    <div className="relative w-full">
                        <div className="w-full rounded-2xl">
                            <Card
                                backgroundImage="url('/assets/images/card-background.svg')"
                                customStyles={`bg-purple-900 flex rounded-2xl h-[197px] mb-2`}
                            >
                                <div className="flex flex-col justify-center text-white px-6 w-full gap-y-3">
                                    <div className="flex items-center gap-x-4 mb-2">
                                        <Image src="/assets/icons/wallet.svg" alt="wallet" width={39} height={39}/>
                                        <div className="font-medium leading-6">Balance</div>
                                    </div>
                                    <div className="w-full flex justify-between gap-x-4">
                                        <h5 className="font-medium leading-6 flex">
                                            {showBalance ? `${formatAmount(formatAmountGHS(merchant?.availableBalance?.toString()))}` : asterisks(6)}
                                        </h5>
                                        <div className="flex justify-center items-center cursor-pointer"
                                             onClick={handleToggleBalance}>
                                            <Svg fill="#FFFFFF"
                                                 path={showBalance ? EyeClosedFilled : EyeOpenedFilled}/>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="block w-full lg:w-2/3 lg:col-span-12 sm:mt-2 md:mt-0">
                    <div className="relative">
                        <div className="w-full">
                            <div className="hidden md:flex">
                                <Card
                                    customStyles={`lg:w-2/3 flex flex-col p-3 w-full border border-purple-900 rounded-l-2xl rounded-r-0 h-[197px]`}>
                                    <div className="flex flex-col h-full">
                                        <h5 className="text-sm md:font-medium leading-6">Recent Transactions</h5>
                                        {transactions?.data?.length === 0 &&
                                            <EmptyTransactionCardContent showContent={false}>
                                                <div
                                                    className="flex flex-col justify-center items-center h-full w-full mt-4">
                                                    <div className="flex justify-between my-4">
                                                        <Svg fill="#F29339" path={UserCircleFill}/>
                                                        <Svg fill="#E6E6E6" path={LineArrowRight} customClasses="mx-8"
                                                             width={46} height={6}/>
                                                        <Svg fill="#59D3D4" path={UsersColorFill}/>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center items-center">
                                                    <h5 className="font-semibold">No data available</h5>
                                                    <p className="font-normal text-xs text-center mt-1 lg:w-2/3 md:w-2/3 sm:w-1/3 sm:mx-6">{emptyTransactionDescription}</p>
                                                </div>
                                            </EmptyTransactionCardContent>}

                                        <div>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {recentTransactions?.map((transaction) => (
                                                    <RecentTransactionCard transaction={transaction}
                                                                           key={transaction.internalId}
                                                                           customStyles="space-x-3 rounded-lg hover:border-gray-400"/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <Card
                                    customStyles={`lg:w-1/3 flex flex-col border-t border-r border-b border-purple-900 w-full rounded-r-2xl h-[197px]`}>
                                    <h5 className="text-sm md:font-medium leading-6 p-3">Scheduled Payments</h5>
                                    {!recentScheduledPayment && <EmptyTransactionCardContent showContent={false}>
                                        <div
                                            className="flex flex-col justify-center items-center h-full w-full">

                                            <div className="flex justify-between my-4">
                                                <Image src="/assets/images/clock-paragraph.svg" alt="paragraph"
                                                       height={28}
                                                       width={0}
                                                       style={{width: 90, height: "auto"}}
                                                       className="flex text-white"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center items-center w-full">
                                                <h5 className="font-semibold">No data available</h5>
                                                <p className="font-normal text-xs text-center mt-1 lg:w-full md:w-2/3 sm:w-1/3 sm:mx-6 lg:px-2">{emptyDisbursementDescription}</p>
                                            </div>
                                        </div>
                                    </EmptyTransactionCardContent>}

                                    {recentScheduledPayment && <div className="px-3">
                                        <div className="flex">
                                            <div className="flex rounded-md text-xs p-1"
                                                 style={{background: '#FDF2DC'}}>
                                                <div className="flex px-1">
                                                    <Image src="/assets/icons/clock.svg" alt="clock" width={16}
                                                           height={16} style={{width: 'auto', height: 16}}
                                                           className="pr-1"/>
                                                    {formatRelativeTime(recentScheduledPayment.processAt ?? '')}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex flex-row my-2 pt-1">
                                                <div className="basis-1/2">
                                                    <InfoCardItem
                                                        description={splitDateAndTime(recentScheduledPayment?.processAt?.toString()).date}
                                                        title="Date"
                                                        customStyles=""
                                                        customTitleStyles=""
                                                        customDescriptionStyles="text-xs"
                                                        svgPath={Calendar}
                                                        svgFill="#4F4F4F"
                                                    />
                                                </div>
                                                <div className="basis-1/2">
                                                    <InfoCardItem
                                                        description={splitDateAndTime(recentScheduledPayment?.processAt?.toString()).time}
                                                        title="Time"
                                                        customStyles="flex"
                                                        customTitleStyles=""
                                                        customDescriptionStyles="text-xs"
                                                    >
                                                        <Image src="/assets/icons/clock.svg" alt="clock" width={24}
                                                               height={24} style={{width: 'auto', height: 24}}/>
                                                    </InfoCardItem>
                                                </div>
                                            </div>

                                            <div className="flex flex-row">
                                                <InfoCardItem
                                                    description={formatAmount(formatAmountGHS(recentScheduledPayment.amount?.toString()))}
                                                    title="Amount"
                                                    customStyles="my-2"
                                                    customTitleStyles=""
                                                    customDescriptionStyles="text-xs"
                                                    svgFill="#4F4F4"
                                                >
                                                    <Image src="/assets/icons/moneybag.svg" alt="clock"
                                                           width={24}
                                                           height={24} style={{width: 'auto', height: 24}}/>
                                                </InfoCardItem>
                                            </div>
                                        </div>
                                    </div>}
                                </Card>
                            </div>

                            <div className="md:hidden sm:flex w-full gap-x-2">
                                <Card
                                    customStyles={`lg:w-2/3 flex flex-col p-3 w-full border border-purple-900 rounded-l-2xl rounded-xl mb-2 h-[197px] `}>
                                    <div className="flex flex-col h-full">
                                        <h5 className="text-sm md:font-medium leading-6">Recent
                                            Transactions</h5>
                                        {transactions?.data?.length === 0 &&
                                            <EmptyTransactionCardContent showContent={false}>
                                                <div
                                                    className="flex flex-col justify-center items-center h-full w-full mt-4">
                                                    <div className="flex justify-between my-4">
                                                        <Svg fill="#F29339" path={UserCircleFill}/>
                                                        <Svg fill="#E6E6E6" path={LineArrowRight}
                                                             customClasses="mx-8"
                                                             width={46} height={6}/>
                                                        <Svg fill="#59D3D4" path={UsersColorFill}/>
                                                    </div>
                                                </div>
                                                <div
                                                    className="flex flex-col justify-center items-center">
                                                    <h5 className="font-semibold">No data available</h5>
                                                    <p className="font-normal text-xs text-center mt-1 lg:w-2/3 md:w-2/3 sm:w-1/3 sm:mx-6">{emptyTransactionDescription}</p>
                                                </div>
                                            </EmptyTransactionCardContent>}

                                        <div>
                                            <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                                                {recentTransactions?.map((transaction) => (
                                                    <RecentTransactionCard transaction={transaction}
                                                                           key={transaction.internalId}
                                                                           customStyles="flex-grow space-x-3 rounded-lg hover:border-gray-400"/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <Card
                                    customStyles={`flex flex-col border border-purple-900 w-full rounded-xl h-[197px]`}>
                                    <h5 className="text-sm md:font-medium leading-6 p-3">Scheduled
                                        Payments</h5>

                                    {!recentScheduledPayment &&
                                        <EmptyTransactionCardContent showContent={false}>
                                            <div
                                                className="flex flex-col justify-center items-center h-full w-full">
                                                <div className="flex justify-between my-4">
                                                    <Image src="/assets/images/clock-paragraph.svg"
                                                           alt="paragraph"
                                                           height={28}
                                                           width={0}
                                                           style={{width: 90, height: "auto"}}
                                                           className="flex text-white"
                                                    />
                                                </div>
                                                <div
                                                    className="flex flex-col justify-center items-center w-full">
                                                    <h5 className="font-semibold">No data available</h5>
                                                    <p className="font-normal text-xs text-center mt-1 lg:w-full md:w-2/3 sm:w-1/3 sm:mx-6 lg:px-2">{emptyDisbursementDescription}</p>
                                                </div>
                                            </div>
                                        </EmptyTransactionCardContent>}

                                    {scheduledPayments && scheduledPayments?.transactions?.length > 0 &&
                                        <div className="px-3">
                                            <div className="flex">
                                                <div className="flex rounded-md text-xs p-1"
                                                     style={{background: '#FDF2DC'}}>
                                                    <div className="flex px-1">
                                                        <Image src="/assets/icons/clock.svg" alt="clock" width={16}
                                                               height={16} style={{width: 'auto', height: 16}}
                                                               className="pr-1"/>
                                                        {formatRelativeTime(
                                                            recentScheduledPayment?.processAt ?? now().toString())}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="flex flex-row my-2 pt-1">
                                                    <div className="basis-1/2">
                                                        <InfoCardItem
                                                            description={splitDateAndTime(recentScheduledPayment?.processAt?.toString()).date}
                                                            title="Date"
                                                            customStyles=""
                                                            customTitleStyles=""
                                                            customDescriptionStyles="text-xs"
                                                            svgPath={Calendar}
                                                            svgFill="#4F4F4F"
                                                        />
                                                    </div>
                                                    <div className="basis-1/2">
                                                        <InfoCardItem
                                                            description={splitDateAndTime(recentScheduledPayment?.processAt?.toString()).time}
                                                            title="Time"
                                                            customStyles="flex"
                                                            customTitleStyles=""
                                                            customDescriptionStyles="text-xs"
                                                        >
                                                            <Image src="/assets/icons/clock.svg" alt="clock" width={24}
                                                                   height={24} style={{width: 'auto', height: 24}}/>
                                                        </InfoCardItem>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row">
                                                    <InfoCardItem
                                                        description={formatAmount(formatAmountGHS(recentScheduledPayment?.amount?.toString()))}
                                                        title="Amount"
                                                        customStyles="my-2"
                                                        customTitleStyles=""
                                                        customDescriptionStyles="text-xs"
                                                        svgFill="#4F4F4"
                                                    >
                                                        <Image src="/assets/icons/moneybag.svg" alt="clock"
                                                               width={24}
                                                               height={24} style={{width: 'auto', height: 24}}/>
                                                    </InfoCardItem>
                                                </div>
                                            </div>
                                        </div>}
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:flex-col md:flex-row lg:flex gap-5">
                <Card
                    customStyles={`lg:w-2/3 flex flex-col border border-gray-200 w-full rounded-2xl h-[417px] px-[40px] p-3 my-5`}>
                    <div className="md:flex justify-between w-full items-center">
                        <h5 className="flex text-md md:font-medium leading-6 my-5">Total Counts</h5>
                        {transactions && transactions?.data?.length > 0 &&
                            <div className="flex lg:justify-end items-center sm:flex-col md:flex-row">
                                <div className="flex items-center text-purple-800">
                                    <div className="w-2 h-2 bg-purple-800 mx-2 rounded-full"/>
                                    Collections
                                </div>
                                <div className="flex items-center text-teal-300">
                                    <div className="w-2 h-2 bg-teal-300 mx-2 rounded-full"/>
                                    Disbursements
                                </div>
                            </div>}
                    </div>

                    {transactions?.data?.length === 0 && <EmptyTransactionCardContent showContent={false}>
                        <div
                            className="flex flex-col justify-center items-center h-full w-full">
                            <div className="flex justify-between my-4">
                                <Image src="/assets/icons/graph.svg" alt="graph"
                                       className="flex text-white" width={155} height={155}
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center w-full">
                                <h5 className="font-semibold">No data available</h5>
                                <p className="font-normal text-xs text-center mt-1 lg:w-2/3 md:w-2/3 sm:w-1/3 sm:mx-6">{transactionDescription}</p>
                            </div>
                        </div>
                    </EmptyTransactionCardContent>}

                    {transactions && transactions?.data?.length > 0 && <div className="flex flex-col h-full">
                        <ReBarGraph data={barGraphData} dataOptionSet={getDataOptions} options={{tooltip: true}}/>
                    </div>}
                </Card>

                <Card customStyles="lg:w-1/3 flex flex-col border border-gray-200 w-full rounded-2xl my-5 h-[417px]">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between w-full items-center mt-5 mx-5">
                            <h5 className="flex text-md md:font-medium leading-6">Total Values</h5>
                        </div>

                        {transactions?.data?.length === 0 && (
                            <EmptyTransactionCardContent showContent={false}>
                                <div className="flex flex-col justify-center items-center h-full w-full">
                                    <div className="flex justify-between my-5">
                                        <Image src="/assets/icons/random-color-squares.svg" alt="squares"
                                               className="flex text-white" width={125} height={125}/>
                                    </div>
                                    <div className="flex flex-col justify-center items-center w-full">
                                        <h5 className="font-semibold">No data available</h5>
                                        <p className="font-normal text-xs text-center mt-1 lg:w-2/3 md:w-2/3 sm:w-1/3 sm:mx-6">{transactionDescription}</p>
                                    </div>
                                </div>
                            </EmptyTransactionCardContent>
                        )}

                        {transactions && transactions?.data?.length > 0 && (
                            <div className="flex flex-col mx-5">
                                <div
                                    className="flex justify-between border border-gray-100 rounded-lg text-center my-5">
                                    <TabsNav tabs={[
                                        {item: 'collections', label: 'collections'},
                                        {item: 'disbursements', label: 'disbursements'}
                                    ]} handleClick={handleNavClick} activeTab={activeNav}/>
                                </div>
                                <div className="flex-grow mt-auto">
                                    <ReAreaGraph data={areaGraphData} dataKey={activeNav} customClasses="flex-grow"/>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OverviewContent;

