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
import {getStats} from "@/api/overview";
import InfoCardItem from "@/components/InfoCardItem";
import Status from "@/components/Status";
import RecentTransactionCard from "@/components/RecentTransactionCard";
import {UserCircleFill} from "@/assets/icons/UserCircleFill";
import {LineArrowRight} from "@/assets/icons/LineArrowRight";
import {UsersColorFill} from "@/assets/icons/UsersColorFill";
import {File} from "@/assets/icons/File";
import {Info} from "@/assets/icons/Info";

const DashboardContent: React.FC = () => {
    const [hasTransaction, setHasTransaction] = useState<boolean | null>(false);
    const [showBalance, setShowBalance] = useState<boolean | null>(true);
    const {transaction, transactions, setTransaction, setTransactions, transactionsByType} = useTransactionStore()
    const {merchant, setMerchant} = useUserStore()

    const collections = transactionsByType('collection')
    console.log(collections)

    const getMerchantStats = () => {
        getStats(merchant?.externalId)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    if (setMerchant) setMerchant(data);
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const getScheduledPayments = () => {
        getStats(merchant?.externalId)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    if (setMerchant) setMerchant(data);
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    useEffect(() => {
        getMerchantStats()
    }, []);

    const handleToggleBalance = () => {
        setShowBalance(!showBalance);
    }

    const asterisks = (count: number) =>
        Array.from({length: count}).map((_, index) => (
            <Svg key={index} path={Asterisk} fill="#FEFEFE"/>
        ));

    const areaGraphData = [
        {
            name: 'Jan',
            uv: 100,
            pv: 200,
            amt: 2400,
        },
        {
            name: 'Feb',
            uv: 340,
            pv: 98,
            amt: 2210,
        },
        {
            name: 'Mar',
            uv: 200,
            pv: 350,
            amt: 2290,
        },
        {
            name: 'Apr',
            uv: 280,
            pv: 308,
            amt: 2000,
        },
        {
            name: 'May',
            uv: 190,
            pv: 270,
            amt: 2181,
        },
        {
            name: 'June',
            uv: 90,
            pv: 300,
            amt: 2500,
        },
    ];
    const disbursementDescription = "Perform disbursements to view recent disbursement"
    const transactionDescription = "Perform a transaction to see your total counts"

    const handleNavClick = (nav: string) => {
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
                                <div className="flex flex-col justify-center text-white px-6 w-full">
                                    <div className="flex items-center gap-x-4 mb-2">
                                        <Image src="/assets/icons/wallet.svg" alt="wallet" width={24} height={24}/>
                                        <div className="text-sm font-medium leading-6">Balance</div>
                                    </div>
                                    <div className="w-full flex  justify-between gap-x-4">
                                        <h5 className="text-sm font-medium leading-6 flex">
                                            {showBalance ? `GHS ${merchant?.actualBalance}` : asterisks(6)}
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
                                                <p className="font-normal text-xs text-center mt-1 lg:w-2/3 md:w-2/3 sm:w-1/3 sm:mx-6">{disbursementDescription}</p>
                                            </div>
                                        </EmptyTransactionCardContent>}

                                        {transactions &&
                                            <div className="flex flex-grow justify-between w-full">
                                                <ul role="list" className="w-3/4">
                                                    {transactions.map((item, index) => (
                                                        <RecentTransactionCard key={index} transaction={item}/>
                                                    ))}
                                                </ul>
                                            </div>}
                                    </div>
                                </Card>
                                <Card
                                    customStyles={`lg:w-1/3 flex flex-col border-t border-r border-b border-purple-900 w-full rounded-r-2xl h-[197px]`}>
                                    <h5 className="text-sm md:font-medium leading-6 p-3">Scheduled Payments</h5>
                                    {hasTransaction && <EmptyTransactionCardContent showContent={false}>
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
                                                    <p className="font-normal text-xs text-center mt-1 lg:w-full md:w-2/3 sm:w-1/3 sm:mx-6 lg:px-2">{disbursementDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </EmptyTransactionCardContent>}

                                    {!hasTransaction && <div className="flex flex-col h-full">
                                        <div className="flex flex-grow justify-between items-center p-3">
                                            <InfoCardItem
                                                title="200" customTitleStyles="font-bold text-md text-gray-900"
                                                description="Individuals"
                                                customDescriptionStyles="text-xs"/>
                                            <div className="flex items-center">
                                                <Image src="/assets/icons/arrow-circle-right.svg" alt="file"
                                                       className="flex text-white" width={24} height={24}
                                                />
                                            </div>
                                            <InfoCardItem
                                                title={`GHS 280000`}
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
                                                    <div className="flex flex-col">
                                                        <p className="text-sm">Batch No. 1</p>
                                                        <p className="text-xs leading-3 ">Scheduled payments</p>
                                                    </div>
                                                    <div className="flex text-xs items-center justify-end">
                                                        <h5 className="">15/09/2023</h5>
                                                    </div>
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
                                                {transactions.map((item, index) => (
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
                                            <InfoCardItem title={'180'} customTitleStyles="font-bold"
                                                          description="Individuals"
                                                          customDescriptionStyles="text-xs truncate"/>
                                            <div className="flex items-center">
                                                <Image src="/assets/icons/arrow-circle-right.svg" alt="file"
                                                       className="flex text-white" width={24} height={24}
                                                />
                                            </div>
                                            <InfoCardItem title={`GHS 280000`} customTitleStyles="font-bold"
                                                          description="Total Amount"
                                                          customDescriptionStyles="text-xs truncate"/>
                                        </div>
                                        <div className="flex items-end bg-purple-900 p-3">
                                            <div className="flex w-full">
                                                <div
                                                    className="flex justify-between items-center ml-3 text-white w-full">
                                                    <InfoCardItem
                                                        svgFill="white" svgPath={File}
                                                        title="Batch No. 1" customTitleStyles="text-xs"
                                                        description="Scheduled payment"
                                                        customDescriptionStyles="text-xs sm:truncate"/>
                                                    <div className="flex text-xs items-center justify-end">
                                                        <h5 className="">15/09/2023</h5>
                                                    </div>
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
                        {hasTransaction && <div className="flex justify-end items-center">
                            <div className="flex items-center text-yellow-300">
                                <div className="w-2 h-2 bg-yellow-400 mx-2 rounded-full"/>
                                Collections
                            </div>
                            <div className="flex items-center text-teal-300">
                                <div className="w-2 h-2 bg-teal-300 mx-2 rounded-full"/>
                                Disbursements
                            </div>
                        </div>}
                    </div>

                    {!hasTransaction && <EmptyTransactionCardContent showContent={false}>
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

                    {hasTransaction && <div className="flex flex-col h-full">
                        {/*<ReBarGraph data={areaGraphData}/>*/}
                    </div>}
                </Card>

                <Card customStyles="lg:w-1/3 flex flex-col border border-gray-200 w-full rounded-2xl my-5 h-[417px]">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between w-full items-center m-5">
                            <h5 className="flex text-md md:font-medium leading-6 m-3">Total Values</h5>
                        </div>

                        {!hasTransaction && (
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

                        {hasTransaction && (
                            <div className="flex flex-col justify-between p-3">
                                <div className="flex justify-between border border-gray-100 rounded-lg text-center">
                                    <TabsNav tabs={[
                                        {item: 'collections', label: 'collections'},
                                        {item: 'disbursements', label: 'disbursements'}
                                    ]} handleClick={handleNavClick}/>
                                </div>
                                <div className="flex flex-grow flex-col">
                                    <ReAreaGraph/>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardContent;

