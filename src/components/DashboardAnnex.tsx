import {Fragment, useState} from 'react';
import {Dialog, Menu, Transition} from '@headlessui/react';
import {
    ArrowDownCircleIcon,
    ArrowPathIcon,
    ArrowUpCircleIcon,
    Bars3Icon,
    EllipsisHorizontalIcon,
    PlusSmallIcon,
} from '@heroicons/react/20/solid';
import {BellIcon, XMarkIcon} from '@heroicons/react/24/outline';
import ReBarGraph from "@/components/charts/ReBarGraph";
import ReAreaGraph from "@/components/charts/ReAreaGraph";
import Test from "@/components/Test";

interface NavigationItem {
    name: string;
    href: string;
    current?: boolean;
}

interface StatItem {
    name: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
}

interface TransactionItem {
    id: number;
    invoiceNumber: string;
    href: string;
    amount: string;
    tax?: string;
    status: string;
    client: string;
    description: string;
    icon: React.ComponentType;
}

interface DayItem {
    date: string;
    dateTime: string;
    transactions: TransactionItem[];
}

interface ClientItem {
    id: number;
    name: string;
    imageUrl: string;
    lastInvoice: {
        date: string;
        dateTime: string;
        amount: string;
        status: string;
    };
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function DashboardAnnex() {
    const stats: StatItem[] = [
        {name: 'Revenue', value: '$405,091.00', change: '+4.75%', changeType: 'positive'},
        {name: 'Overdue invoices', value: '$12,787.00', change: '+54.02%', changeType: 'negative'},
        {name: 'Outstanding invoices', value: '$245,988.00', change: '-1.39%', changeType: 'positive'},
        {name: 'Expenses', value: '$30,156.00', change: '+10.18%', changeType: 'negative'},
    ];

    const statuses: Record<string, string> = {
        Paid: 'text-green-700 bg-green-50 ring-green-600/20',
        Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
        Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
    };

    const days: DayItem[] = [
        {
            date: 'Today',
            dateTime: '2023-03-22',
            transactions: [
                {
                    id: 1,
                    invoiceNumber: '00012',
                    href: '#',
                    amount: '$7,600.00 USD',
                    tax: '$500.00',
                    status: 'Paid',
                    client: 'Reform',
                    description: 'Website redesign',
                    icon: ArrowUpCircleIcon,
                },
                {
                    id: 2,
                    invoiceNumber: '00011',
                    href: '#',
                    amount: '$10,000.00 USD',
                    status: 'Withdraw',
                    client: 'Tom Cook',
                    description: 'Salary',
                    icon: ArrowDownCircleIcon,
                },
                {
                    id: 3,
                    invoiceNumber: '00009',
                    href: '#',
                    amount: '$2,000.00 USD',
                    tax: '$130.00',
                    status: 'Overdue',
                    client: 'Tuple',
                    description: 'Logo design',
                    icon: ArrowPathIcon,
                },
            ],
        },
        {
            date: 'Yesterday',
            dateTime: '2023-03-21',
            transactions: [
                {
                    id: 4,
                    invoiceNumber: '00010',
                    href: '#',
                    amount: '$14,000.00 USD',
                    tax: '$900.00',
                    status: 'Paid',
                    client: 'SavvyCal',
                    description: 'Website redesign',
                    icon: ArrowUpCircleIcon,
                },
            ],
        },
    ];

    const clients: ClientItem[] = [
        {
            id: 1,
            name: 'Tuple',
            imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
            lastInvoice: {date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue'},
        },
        {
            id: 2,
            name: 'SavvyCal',
            imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
            lastInvoice: {date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid'},
        },
        {
            id: 3,
            name: 'Reform',
            imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
            lastInvoice: {date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid'},
        },
    ];

    return (
        <>
            <Test/>
        </>
    );
}
