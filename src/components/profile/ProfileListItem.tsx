import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProfileListItem: React.FC<IProfileListItemProps> = ({to, label, iconSrc, onClick}) => {
    return (
        <Link
            href={to}
            className="flex px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
            role="menuitem"
            onClick={() => onClick(label)}
        >
            <div className="flex">
                <Image className="pr-1" src={iconSrc} alt={label} width={24} height={24}/>
                <span className="capitalize">{label}</span>
            </div>
        </Link>
    );
};

export default ProfileListItem;
