import React from 'react';

interface ProfileIconProps {
    onClick: () => void;
    label: String;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({onClick, label}) => {
    return (
        <button
            id="dropdown-button"
            onClick={onClick}
            className="inline-flex justify-center p-3 text-sm font-medium text-gray-400 shadow-sm focus:outline-none focus:ring-offset-gray-100 focus:ring-blue-500 rounded-full"
            style={{
                background: "linear-gradient(0deg, #EFEFEF, #EFEFEF)",
                border: "1px solid #E2E2E2",
                color: "#4F4F4F"
            }}
        >
            {label}
        </button>
    );
};

export default ProfileIcon;
