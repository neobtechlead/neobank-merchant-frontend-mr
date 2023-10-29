import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';

const NavigationLinks: React.FC = () => {
    const navigationItems = [
        {to: '/overview', name: 'overview', iconSrc: '/assets/icons/home.svg'},
        {to: '/disbursements', name: 'Disbursements', iconSrc: '/assets/icons/upload.svg'},
        {to: '/collections', name: 'Collections', iconSrc: '/assets/icons/hand-coins.svg'},
        {to: '/reports', name: 'Reports', iconSrc: '/assets/icons/reports.svg'},
    ];

    const defaultMenuClasses = 'inline-flex items-center border-b-4 p-5 text-sm text-gray-900';
    const pathname = usePathname();

    const isActive = (to: string) => pathname === to;

    return (
        <div className="flex justify-between">
            {navigationItems.map((item) => (
                <Link key={item.to} href={item.to}
                      className={`${defaultMenuClasses} ${
                          isActive(item.to)
                              ? 'border-purple-900 font-medium'
                              : 'border-transparent'
                      }`}
                >
                    <div className="flex items-center">
                        <Image
                            className="pr-2"
                            src={item.iconSrc}
                            alt={item.name}
                            width={24}
                            height={24}
                        />
                        <span className="capitalize">{item.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NavigationLinks;
