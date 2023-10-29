import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";

const NavigationLinks: React.FC = () => {
    const navigationItems = [
        {to: '/dashboard', name: 'dashboard', iconSrc: "/assets/icons/home.svg"},
        {to: '/disbursements', name: 'Disbursements', iconSrc: "/assets/icons/upload.svg"},
        {to: '/collections', name: 'Collections', iconSrc: "/assets/icons/hand-coins.svg"},
        {to: '/reports', name: 'Reports', iconSrc: "/assets/icons/reports.svg"}
    ];
    const [activeTab, setActiveTab] = useState(0);

    const defaultMenuClasses = 'inline-flex items-center border-b-4 px-3 pt-1 text-sm text-gray-900'

    return (
        <>
            {navigationItems.map((item, index) => (
                <Link
                    key={item.to}
                    className={`${defaultMenuClasses} ${activeTab === index ? 'border-indigo-500 font-medium' : 'border-transparent'}`}
                    href={item.to}
                    onClick={() => setActiveTab(index)}
                >
                    <div className="flex items-center">
                        <Image className="pr-2" src={item.iconSrc} alt={item.name} width={24} height={24}/>
                        <span className="capitalize">{item.name}</span>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default NavigationLinks;
