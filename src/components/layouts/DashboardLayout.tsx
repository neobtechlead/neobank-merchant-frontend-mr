import React from 'react';
import NavigationLinks from "@/components/navigation/NavigationLinks";
import Logo from "../../../public/assets/images/logo.png";
import {useDashboardStore} from "@/store/DashboardStore";
import Image from "next/image";
import ProfileDropdown from "@/components/profile/ProfileDropdown";

const DashboardLayout: React.FC = ({
                                       children,
                                       customStyles,
                                       headerStyles,
                                       logoStyles
                                   }) => {

    const {
        showLogo,
        showNavigation,
        showProfileDropdown,
        headerTitle,
        headerDescription,
        showHeader,
    } = useDashboardStore();

    return (
        <div>
            <div className={`sticky top-0 z-10 ${customStyles}`}>
                <nav className="bg-white flex justify-between md:items-center px-6 pb-0 md:px-8 h-16">
                    <div className={`flex md:justify-start items-center ${logoStyles}`}>
                        {showLogo && <Image src={Logo} alt="neobank" width={85} height={35}/>}
                        {children.logo}
                    </div>

                    <div className="flex capitalize">
                        <div className="hidden md:flex md:justify-center">
                            {showNavigation && <NavigationLinks/>}
                        </div>
                        {children.navigationLinks}
                    </div>

                    <div className="flex justify-end items-center">
                        {showProfileDropdown && <ProfileDropdown/>}
                        {children.profileDropdown}
                    </div>
                </nav>

                {showHeader && <header className="bg-white shadow-sm flex" style={{
                    background: 'url("/assets/images/cyan-background.svg")',
                    height: 147,
                }}>
                    <div className={`w-full md:px-3 py-5 flex flex-col justify-center lg:ml-[90px] ${headerStyles}`}>
                        <div className="max-w-7xl flex flex-col">
                            <h1 className="text-lg font-semibold leading-6 text-gray-900">{headerTitle}</h1>
                            <p className="font-normal text-sm mt-2">{headerDescription}</p>
                        </div>
                    </div>
                </header>}
            </div>

            <div className="overflow-y-hidden md:mx-[12px] mx-auto">
                <div className="h-full md:px-3 lg:px-[70px]">
                    {children.body}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
