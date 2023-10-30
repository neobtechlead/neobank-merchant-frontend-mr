/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, {Fragment, useState} from 'react'
import {Dialog, Listbox, Menu, Transition} from '@headlessui/react'
import {
    Bars3Icon,
    CalendarDaysIcon,
    CreditCardIcon,
    EllipsisVerticalIcon,
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    UserCircleIcon,
    XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import {BellIcon, XMarkIcon as XMarkIconOutline} from '@heroicons/react/24/outline'
import {CheckCircleIcon} from '@heroicons/react/24/solid'
import Image from "next/image";
import Svg from "@/components/Svg";
import {EyeClosedFilled, EyeOpenedFilled} from "../../public/assets/icons/eye-filled";
import Card from "@/components/Card";
import {Asterisk} from "../../public/assets/icons/asterisk";
import EmptyTransactionCardContent from "@/components/EmptyTransactionCardContent";

const navigation = [
    {name: 'Home', href: '#'},
    {name: 'Invoices', href: '#'},
    {name: 'Clients', href: '#'},
    {name: 'Expenses', href: '#'},
]
const invoice = {
    subTotal: '$8,800.00',
    tax: '$1,760.00',
    total: '$10,560.00',
    items: [
        {
            id: 1,
            title: 'Logo redesign',
            description: 'New logo and digital asset playbook.',
            hours: '20.0',
            rate: '$100.00',
            price: '$2,000.00',
        },
        {
            id: 2,
            title: 'Website redesign',
            description: 'Design and program new company website.',
            hours: '52.0',
            rate: '$100.00',
            price: '$5,200.00',
        },
        {
            id: 3,
            title: 'Business cards',
            description: 'Design and production of 3.5" x 2.0" business cards.',
            hours: '12.0',
            rate: '$100.00',
            price: '$1,200.00',
        },
        {
            id: 4,
            title: 'T-shirt design',
            description: 'Three t-shirt design concepts.',
            hours: '4.0',
            rate: '$100.00',
            price: '$400.00',
        },
    ],
}
const activity = [
    {id: 1, type: 'created', person: {name: 'Chelsea Hagon'}, date: '7d ago', dateTime: '2023-01-23T10:32'},
    {id: 2, type: 'edited', person: {name: 'Chelsea Hagon'}, date: '6d ago', dateTime: '2023-01-23T11:03'},
    {id: 3, type: 'sent', person: {name: 'Chelsea Hagon'}, date: '6d ago', dateTime: '2023-01-23T11:24'},
    {
        id: 4,
        type: 'commented',
        person: {
            name: 'Chelsea Hagon',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
        date: '3d ago',
        dateTime: '2023-01-23T15:56',
    },
    {id: 5, type: 'viewed', person: {name: 'Alex Curren'}, date: '2d ago', dateTime: '2023-01-24T09:12'},
    {id: 6, type: 'paid', person: {name: 'Alex Curren'}, date: '1d ago', dateTime: '2023-01-24T09:20'},
]
const moods = [
    {name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500'},
    {name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400'},
    {name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400'},
    {name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400'},
    {name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500'},
    {name: 'I feel nothing', value: null, icon: XMarkIconMini, iconColor: 'text-gray-400', bgColor: 'bg-transparent'},
]

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Test({merchant, transactionData}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selected, setSelected] = useState(moods[5])
    const [hasTransaction, setHasTransaction] = useState<boolean | null>(true);
    const [showBalance, setShowBalance] = useState<boolean | null>(true);

    const handleToggleBalance = () => {
        setShowBalance(!showBalance);
    }

    const asterisks = (count: number) =>
        Array.from({length: count}).map((_, index) => (
            <Svg key={index} path={Asterisk} fill="#FEFEFE"/>
        ));

    return (
        <>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-4">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* Invoice summary */}
                        <div className="lg:col-start-1 lg:row-end-1">
                            {/*<Card*/}
                            {/*    backgroundImage="url('/assets/images/card-background.svg')"*/}
                            {/*    customStyles={`bg-purple-900 flex rounded-2xl h-[197px] mb-2`}*/}
                            {/*>*/}
                            {/*    <div className="flex flex-col justify-center text-white px-6 w-full">*/}
                            {/*        <div className="flex items-center gap-x-4 mb-2">*/}
                            {/*            <Image src="/assets/icons/wallet.svg" alt="wallet" width={24} height={24}/>*/}
                            {/*            <div className="text-sm font-medium leading-6">Balance</div>*/}
                            {/*        </div>*/}
                            {/*        <div className="w-full flex  justify-between gap-x-4">*/}
                            {/*            <h5 className="text-sm font-medium leading-6 flex">*/}
                            {/*                {showBalance ? `GHS ${merchant.balance}` : asterisks(6)}*/}
                            {/*            </h5>*/}
                            {/*            <div className="flex justify-center items-center cursor-pointer"*/}
                            {/*                 onClick={handleToggleBalance}>*/}
                            {/*                <Svg fill="#FFFFFF"*/}
                            {/*                     path={showBalance ? EyeClosedFilled : EyeOpenedFilled}/>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</Card>*/}
                        </div>

                        {/* Invoice */}
                        <div
                            className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16  ">
                            <h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
                            <Card
                                customStyles={`lg:w-2/3 flex flex-col p-3 w-full border border-purple-900 rounded-l-2xl rounded-r-0 h-[197px] `}>
                                <div className="flex flex-col h-full">
                                    <h5 className="text-sm md:font-medium leading-6">Recent Disbursements</h5>
                                    <div className="flex flex-grow justify-between w-full">
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
                                    </div>
                                    }
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
