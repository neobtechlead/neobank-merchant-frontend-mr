import React from 'react';
import Image from "next/image";
import Link from "next/link";

interface MenuItemProps {
    iconSrc: string;
    name: string;
    to: string;
    active: boolean;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({iconSrc, name, to, active, onClick}) => {
    return (
        <Link
            href={to}
            className="inline-flex items-center border-b-2 border-indigo-500 px-3 pt-1 text-sm font-medium text-gray-900"
        >
            <div className="flex">
                <Image className="pr-2" src={iconSrc} alt={name} width={24} height={24}/>
                <span className="capitalize">{name}</span>
            </div>
        </Link>
    );
};

export default MenuItem;
