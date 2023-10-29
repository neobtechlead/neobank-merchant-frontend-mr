import React from 'react';
import ProfileListItem from './ProfileListItem';

const ProfileList: React.FC = () => {
    const profileItems = [
        {
            href: '#',
            label: 'profile',
            iconSrc: '/assets/icons/user-circle.svg',
        },
        {
            href: '/settings',
            label: 'settings',
            iconSrc: '/assets/icons/settings.svg',
        },
        {
            href: '/',
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
                />
            ))}
        </div>
    );
};

export default ProfileList;
