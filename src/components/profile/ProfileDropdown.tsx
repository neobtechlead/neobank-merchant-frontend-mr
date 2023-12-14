import React, {useState, useEffect, useRef} from 'react';
import ProfileIcon from "@/components/profile/ProfileIcon";
import ProfileList from "@/components/profile/ProfileList";
import {useUserStore} from "@/store/UserStore";
import {getInitials} from "@/utils/lib";

const ProfileDropdown: React.FC<IProfileDropdownProps> = ({onClick}) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const {merchant} = useUserStore()
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    useEffect(() => {
        function handleDocumentClick(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('click', handleDocumentClick);
        } else {
            document.removeEventListener('click', handleDocumentClick);
        }

        return () => document.removeEventListener('click', handleDocumentClick);
    }, [isDropdownOpen]);

    const handleDropdownButtonClick = () => {
        toggleDropdown();
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="relative inline-block text-left" ref={dropdownRef}>
                    <ProfileIcon label={getInitials(merchant?.businessName)} onClick={handleDropdownButtonClick}/>
                    <div
                        id="dropdown-menu"
                        className={`origin-top-right absolute right-0 mt-5 border rounded-md shadow-lg bg-white ${isDropdownOpen ? '' : 'hidden'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="p-4 border-b flex items-center">
                            <ProfileIcon label={getInitials(merchant?.businessName)} onClick={() => {
                            }}/>
                            <span className="sr-only">Open user menu</span>

                            <div className="inline-block items-center ml-2">
                                <div className="whitespace-nowrap">{merchant?.businessName}</div>
                                <div className="text-gray-600 text-xs whitespace-nowrap">Merchant</div>
                            </div>
                        </div>

                        <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                            <ProfileList onClick={onClick}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDropdown;
