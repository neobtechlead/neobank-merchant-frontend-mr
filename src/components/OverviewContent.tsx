'use client'
import React, {useEffect, useState} from 'react';
import Card from "@/components/Card";
import Image from "next/image";
import EmptyTransactionCardContent from "@/components/EmptyTransactionCardContent";
import Svg from "@/components/Svg";
import {EyeOpenedFilled, EyeClosedFilled} from '@/assets/icons/eye-filled';
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
import {calculateDateRange, formatAmount, formatAmountGHS, normalizeDate, plotGraphData} from "@/utils/lib";
import {TransactionGraphDataType} from "@/utils/types/TranasctionGraphDataType";
import {listTransactions} from "@/api/transaction";
import {TransactionType} from "@/utils/types/TransactionType";
import {listScheduledPayments} from "@/api/disbursement";
import {File} from "@/assets/icons/File";

const OverviewContent: React.FC = () => {
    const [hasTransaction, setHasTransaction] = useState<boolean | null>(false);
    const [showBalance, setShowBalance] = useState<boolean | null>(true);
    const [activeNav, setActiveNav] = useState<string>('collections');
    const [recentScheduledPayment, setRecentScheduledPayment] = useState<TransactionType>();
    const {
        transactions,
        disbursements,
        setTransactions,
        setCollections,
        setDisbursements,
        transactionSummary,
        setTransactionSummary,
        scheduledPayments,
        setScheduledPayments
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
                    const transactions = (await response.json()).data.transactions;
                    if (transactions.length > 0) {
                        setHasTransaction(true)
                        const collections = transactions.filter((transaction: {
                            type: string
                        }) => transaction.type.toLowerCase() === 'collection');
                        const disbursements = transactions.filter((transaction: {
                            type: string
                        }) => transaction.type.toLowerCase() === 'disbursement');
                        if (setCollections) setCollections(collections)
                        if (setDisbursements) setDisbursements(disbursements)
                        if (setTransactions) setTransactions(transactions);
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
                    if (transactions.length > 0) {
                        setRecentScheduledPayment(transactions[0])
                        if (setScheduledPayments) setScheduledPayments(transactions);
                    }
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
        getRecentScheduledBulkPayment()
    }

    const getRecentScheduledBulkPayment = () => {
        if (disbursements) {
            const transactions = disbursements.filter((disbursement) => {
                return disbursement.processAt !== null;
            });

            if (transactions.length > 0) return setRecentScheduledPayment(transactions[0])
        }
    }

    useEffect(() => {
        getMerchantStats()
        fetchTransactionSummary()
        fetchTransactions()
        fetchScheduledPayments()
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
                            <div className="hidden md:flex lg:flex">
                                <Card
                                    customStyles={`lg:w-2/3 flex flex-col p-3 w-full border border-purple-900 rounded-l-2xl rounded-r-0 h-[197px] `}>
                                    <div className="flex flex-col h-full">
                                        <h5 className="text-sm md:font-medium leading-6">Recent Transactions</h5>
                                        {transactions.length === 0 && <EmptyTransactionCardContent showContent={false}>
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

                                        <div className="flex">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {transactions.map((transaction) => (
                                                    <RecentTransactionCard transaction={transaction}
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
                                        <div className="">
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
                                        </div>
                                    </EmptyTransactionCardContent>}

                                    {scheduledPayments && <div className="flex flex-col h-full">
                                        <div className="flex flex-grow justify-between items-center p-3">
                                            <InfoCardItem
                                                title={recentScheduledPayment?.amount?.toString() ?? '0'}
                                                customTitleStyles="font-bold text-md text-gray-900"
                                                description="Individuals"
                                                customDescriptionStyles="text-xs"/>
                                            <div className="flex items-center">
                                                <Image src="/assets/icons/arrow-circle-right.svg" alt="file"
                                                       className="flex text-white" width={24} height={24}
                                                />
                                            </div>
                                            <InfoCardItem
                                                title={recentScheduledPayment?.amount?.toString() ?? '0'}
                                                customTitleStyles="font-bold text-md text-gray-900 truncate"
                                                description="Total Amount"
                                                customDescriptionStyles="text-xs"/>
                                        </div>
                                        <div className="flex items-end bg-purple-900 p-3">
                                            <div className="flex w-full">
                                                <Image src="/assets/icons/file-white.svg" alt="file"
                                                       className="flex text-white" width={24} height={24}
                                                />
                                                <div
                                                    className="flex justify-between items-center ml-3 text-white w-full">
                                                    <InfoCardItem
                                                        title={recentScheduledPayment?.amount?.toString() ?? '0'}
                                                        customTitleStyles="font-bold text-md text-gray-900 truncate text-white"
                                                        description="Scheduled payments"
                                                        customDescriptionStyles="text-xs leading-3 text-white"/>
                                                    <InfoCardItem
                                                        title={recentScheduledPayment?.createdAt?.toString()}
                                                        customTitleStyles="text-xs text-gray-900 truncate text-white"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </Card>
                            </div>

                            <div className="md:hidden sm:flex w-full">
                                <Card
                                    customStyles={`flex flex-col p-3 w-full border border-purple-900
                                     rounded-xl h-[197px]`}>
                                    <div className="flex flex-col h-full">
                                        <h5 className="flex text-sm font-medium leading-6 items-start">Recent
                                            Disbursements</h5>
                                        <div className="flex flex-grow justify-between w-full">
                                            <ul role="list" className="w-full">
                                                {transactions && transactions.map((item, index) => (
                                                    <li key={index} className="flex justify-between gap-x-6 mb-2">
                                                        <div className="flex min-w-0 gap-x-4">
                                                            <Image src="/assets/icons/file-dark.svg" alt="file"
                                                                   width={24} height={24}/>
                                                            <div className="min-w-0 flex-auto">
                                                                <p className="mt-1 truncate text-xs leading-5 text-green-600">{item.status}</p>
                                                                <p className="mt-1 truncate text-xs leading-5 ">{item.batchId}</p>
                                                                <p className="text-sm font-semibold leading-6 text-gray-900">{item.amount}</p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="shrink-0 flex sm:flex-col sm:items-end justify-center items-center">
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">{item.date}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Card>

                                <Card
                                    customStyles={`flex flex-col border border-purple-900 w-full rounded-xl h-[197px]`}>
                                    <h5 className="text-sm md:font-medium leading-6 p-3">Scheduled Payments</h5>

                                    <div className="flex flex-col h-full">
                                        <div className="flex flex-grow justify-between items-center p-3">
                                            <InfoCardItem title={recentScheduledPayment?.amount?.toString() ?? '0'} customTitleStyles="font-bold"
                                                          description="Individuals"
                                                          customDescriptionStyles="text-xs truncate"/>
                                            <div className="flex items-center">
                                                <Image src="/assets/icons/arrow-circle-right.svg" alt="file"
                                                       className="flex text-white" width={24} height={24}
                                                />
                                            </div>
                                            <InfoCardItem title={recentScheduledPayment?.amount?.toString() ?? '0'} customTitleStyles="font-bold"
                                                          description="Total Amount"
                                                          customDescriptionStyles="text-xs truncate"/>
                                        </div>
                                        <div className="flex items-end bg-purple-900 p-3">
                                            <div className="flex w-full">
                                                <div
                                                    className="flex justify-between items-center ml-3 text-white w-full">
                                                    <InfoCardItem
                                                        svgFill="white" svgPath={File}
                                                        title={recentScheduledPayment?.amount?.toString() ?? '0'}
                                                        customTitleStyles="font-bold text-md text-gray-900 truncate text-white"
                                                        description="Scheduled payments"
                                                        customDescriptionStyles="text-xs leading-3 text-white"/>
                                                    <InfoCardItem
                                                        title={normalizeDate(recentScheduledPayment?.createdAt?.toString() ?? '')}
                                                        customTitleStyles="text-xs text-gray-900 truncate text-white"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-5">
                <Card
                    customStyles={`lg:w-2/3 flex flex-col border border-gray-200 w-full rounded-2xl h-[417px] px-[40px] p-3 my-5`}>
                    <div className="flex justify-between w-full items-center">
                        <h5 className="flex text-md md:font-medium leading-6 my-5">Total Counts</h5>
                        {transactions.length > 0 && <div className="flex justify-end items-center">
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

                    {!transactions && <EmptyTransactionCardContent showContent={false}>
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

                    {transactions && <div className="flex flex-col h-full">
                        <ReBarGraph data={barGraphData} dataOptionSet={getDataOptions} options={{tooltip: true}}/>
                    </div>}
                </Card>

                <Card customStyles="lg:w-1/3 flex flex-col border border-gray-200 w-full rounded-2xl my-5 h-[417px]">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between w-full items-center m-5">
                            <h5 className="flex text-md md:font-medium leading-6 m-3">Total Values</h5>
                        </div>

                        {!transactions && (
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

                        {transactions && (
                            <div className="flex flex-col justify-between p-3">
                                <div className="flex justify-between border border-gray-100 rounded-lg text-center">
                                    <TabsNav tabs={[
                                        {item: 'collections', label: 'collections'},
                                        {item: 'disbursements', label: 'disbursements'}
                                    ]} handleClick={handleNavClick} activeTab={activeNav}/>
                                </div>
                                <div className="flex flex-grow flex-col">
                                    <ReAreaGraph data={areaGraphData} dataKey={activeNav}/>
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

