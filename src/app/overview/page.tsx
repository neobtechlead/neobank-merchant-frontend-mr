'use client'
import React, {useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Card from "@/components/Card";
import Image from "next/image";
import EmptyTransactionCardContent from "@/components/EmptyTransactionCardContent";
import LineGraph from "@/components/charts/LineGraph";
import BarGraph from "@/components/charts/BarGraph";
import Svg from "@/components/Svg";
import {EyeOpenedFilled, EyeClosedFilled} from '../../../public/assets/icons/eye-filled';
import {Asterisk} from '../../../public/assets/icons/asterisk';

const Overview: React.FC = () => {
    const [hasTransaction, setHasTransaction] = useState<boolean | null>(true);
    const [showBalance, setShowBalance] = useState<boolean | null>(true);

    const merchant = {
        balance: '630,000.00',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
        lastInvoiceDate: '2022-12-13',
        amount: '$2,000.00',
        status: 'pending',
    };

    const transactionData = [
        {
            status: "Successful",
            batchNo: "Batch No. 5",
            amount: "GHS 60,000",
            date: "12/05/2023",
        },
        {
            status: "Successful",
            batchNo: "Batch No. 5",
            amount: "GHS 60,000",
            date: "12/05/2023",
        },
    ];

    const handleToggleBalance = () => {
        setShowBalance(!showBalance);
    }

    const asterisks = (count: number) =>
        Array.from({length: count}).map((_, index) => (
            <Svg key={index} path={Asterisk} fill="#FEFEFE"/>
        ));

    return (
        <DashboardLayout headerTitle="Hello Complete Farmer" headerDescription="Welcome to your dashboard">
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
                                                {showBalance ? `GHS ${merchant.balance}` : asterisks(6)}
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
                                            <h5 className="text-sm md:font-medium leading-6">Recent Disbursements</h5>
                                            {!hasTransaction && <EmptyTransactionCardContent contentType="disbursement">
                                                <div className="">
                                                    <div
                                                        className="flex flex-col justify-center items-center h-full w-full">
                                                        <div className="flex justify-between my-4">
                                                            <Image src="/assets/icons/user-circle-color-fill.svg"
                                                                   alt="user"
                                                                   className="" width={24} height={24}
                                                            />
                                                            <Image src="/assets/icons/line-arrow-right.svg" alt="arrow"
                                                                   className="mx-8" width={45} height={24}
                                                            />
                                                            <Image src="/assets/icons/users-color-fill.svg" alt="users"
                                                                   className="" width={24} height={24}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </EmptyTransactionCardContent>}
                                            {hasTransaction && <div className="flex flex-grow justify-between w-full">
                                                <ul role="list" className="w-3/4">
                                                    {transactionData.map((item, index) => (
                                                        <li key={index} className="flex justify-between gap-x-6 mb-2">
                                                            <div className="flex min-w-0 gap-x-4">
                                                                <Image src="/assets/icons/file-dark.svg" alt="file"
                                                                       width={24} height={24}/>
                                                                <div className="min-w-0 flex-auto">
                                                                    <p className="mt-1 truncate text-xs leading-5 text-green-600">{item.status}</p>
                                                                    <p className="mt-1 truncate text-xs leading-5 ">{item.batchNo}</p>
                                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.amount}</p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-center items-center">
                                                                <p className="mt-1 text-xs leading-5 text-gray-500">{item.date}</p>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>}
                                        </div>
                                    </Card>
                                    <Card
                                        customStyles={`lg:w-1/3 flex flex-col border-t border-r border-b border-purple-900 w-full rounded-r-2xl h-[197px] p-3`}>
                                        <h5 className="text-sm md:font-medium leading-6">Scheduled Payments</h5>
                                        {!hasTransaction && <EmptyTransactionCardContent contentType="payment">
                                            <div className="">
                                                <div
                                                    className="flex flex-col justify-center items-center h-full w-full">
                                                    <div className="flex justify-between my-4">
                                                        <Image src="/assets/icons/clock-color.svg" alt="file"
                                                               className="flex text-white" width={24} height={24}
                                                        />
                                                        <Image src="/assets/icons/paragraph-color.svg" alt="file"
                                                               className="flex text-white" width={24} height={24}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </EmptyTransactionCardContent>}

                                        {hasTransaction && <div className="flex flex-col h-full">
                                            <div className="flex flex-grow justify-between items-center p-3">
                                                <div className="flex flex-col">
                                                    <span className="font-bold">150</span>
                                                    <span className="text-xs">Individuals</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Image src="/assets/icons/arrow-circle-right.svg" alt="file"
                                                           className="flex text-white" width={24} height={24}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="flex font-bold">&#8373; {280000}</span>
                                                    <span className="text-xs">Total Amount</span>
                                                </div>
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
                                                    {transactionData.map((item, index) => (
                                                        <li key={index} className="flex justify-between gap-x-6 mb-2">
                                                            <div className="flex min-w-0 gap-x-4">
                                                                <Image src="/assets/icons/file-dark.svg" alt="file"
                                                                       width={24} height={24}/>
                                                                <div className="min-w-0 flex-auto">
                                                                    <p className="mt-1 truncate text-xs leading-5 text-green-600">{item.status}</p>
                                                                    <p className="mt-1 truncate text-xs leading-5 ">{item.batchNo}</p>
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
                                        customStyles={`flex flex-col border border-purple-900 w-full rounded-xl h-[197px]
                                    `}>
                                        <h5 className="text-sm md:font-medium leading-6 p-3">Scheduled Payments</h5>

                                        <div className="flex flex-col h-full">
                                            <div className="flex flex-grow justify-between items-center p-3">
                                                <div className="flex flex-col">
                                                    <span className="font-bold">150</span>
                                                    <span className="text-xs truncate">Individuals</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Image src="/assets/icons/arrow-circle-right.svg" alt="file"
                                                           className="flex text-white" width={24} height={24}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="flex font-bold">&#8373; {280000}</span>
                                                    <span className="text-xs">Total Amount</span>
                                                </div>
                                            </div>
                                            <div className="flex items-end bg-purple-900 p-3">
                                                <div className="flex w-full">
                                                    <Image src="/assets/icons/file-white.svg" alt="file"
                                                           className="flex text-white" width={24} height={24}
                                                    />
                                                    <div
                                                        className="flex justify-between items-center ml-3 text-white w-full">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm">Batch No. 1</span>
                                                            <span
                                                                className="text-xs sm:truncate">Scheduled payment</span>
                                                        </div>
                                                        <div className="flex text-xs items-center justify-end">
                                                            {/*15/09/2023*/}
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
                        customStyles={`lg:w-2/3 flex flex-col border border-gray-200 w-full rounded-2xl h-[360px] px-[40px] p-3 my-5`}>
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
                        {!hasTransaction && <EmptyTransactionCardContent>
                            <div
                                className="flex flex-col justify-center items-center h-full w-full">
                                <div className="flex justify-between">
                                    <Image src="/assets/icons/graph.svg" alt="graph"
                                           className="flex text-white" width={125} height={24}
                                    />
                                </div>
                            </div>
                        </EmptyTransactionCardContent>}

                        {hasTransaction && <div className="flex flex-col h-full">
                            graph
                        </div>}
                    </Card>

                    <Card
                        customStyles={`lg:w-1/3 flex flex-col border border-gray-200 w-full rounded-2xl h-[360px] px-[40px] p-3 my-5`}>
                        {!hasTransaction && <EmptyTransactionCardContent>
                            <div
                                className="flex flex-col justify-center items-center h-full w-full">
                                <div className="flex justify-between">
                                    <Image src="/assets/icons/random-color-squares.svg" alt="squares"
                                           className="flex text-white" width={125} height={125}
                                    />
                                </div>
                            </div>
                        </EmptyTransactionCardContent>}

                        {hasTransaction && <div className="flex flex-col h-full">
                            graph
                        </div>}
                    </Card>
                </div>

                <div className="flex w-full justify-between">
                    <div className="flex  w-full h-full">
                        <BarGraph/>
                    </div>
                    <div className="flex w-full h-full">
                        <LineGraph/>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Overview;

