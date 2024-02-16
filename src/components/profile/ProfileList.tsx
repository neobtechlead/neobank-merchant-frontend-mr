import React from 'react';
import ProfileListItem from "@/components/profile/ProfileListItem";

const ProfileList: React.FC<IProfileListProps> = ({onClick}) => {
    const profileItems = [
        {
            href: '#profile',
            label: 'profile',
            iconSrc: '/assets/icons/user-circle.svg',
        },
        {
            href: '#settings',
            label: 'settings',
            iconSrc: '/assets/icons/settings.svg',
        },
        {
            href: '',
            label: 'logout',
            iconSrc: '/assets/icons/logout.svg',
        },
    ];

    return (
        <div className="my-2 bg-white">
            {profileItems.map((item, index) => (
                <ProfileListItem
                    key={index}
                    to={item.href}
                    label={item.label}
                    iconSrc={item.iconSrc}
                    onClick={onClick}
                />
            ))}
        </div>
    );
};

export default ProfileList;
