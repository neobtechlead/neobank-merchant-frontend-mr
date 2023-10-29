import React from 'react';
import NavigationLinks from '../navigation/NavigationLinks';
import ProfileDropdown from '../profile/ProfileDropdown';
import Image from 'next/image';

type MyComponentProps = {
    headerTitle: string;
    headerDescription: string;
};

const DashboardLayout: React.FC<MyComponentProps> = ({headerTitle, headerDescription, children}) => {
    const headerStyle = {
        background: 'url("/assets/images/cyan-background.svg")',
        height: 147,
    };

    return (
        <div>
            <div className="sticky top-0 z-10">
                <nav className="bg-white flex justify-between md:items-center px-6 pb-0 md:px-8 h-16">
                    <div className="flex md:justify-start items-center">
                        <Image src="/assets/images/logo.png" alt="neobank" width={85} height={35}/>
                    </div>

                    <div className="hidden md:flex md:justify-center">
                        <NavigationLinks/>
                    </div>

                    <div className="flex justify-end items-center">
                        <ProfileDropdown/>
                    </div>
                </nav>

                <header className="bg-white shadow-sm flex" style={headerStyle}>
                    <div className="w-full md:px-3 py-5 flex flex-col justify-center lg:ml-[90px] ">
                        <div className="max-w-7xl flex flex-col">
                            <h1 className="text-lg font-semibold leading-6 text-gray-900">{headerTitle}</h1>
                            <p className="font-normal text-sm mt-2">{headerDescription}</p>
                        </div>
                    </div>
                </header>
            </div>

            <div className="overflow-y-hidden md:mx-[12px] mx-auto">
                <div className="h-full md:px-3 lg:px-[70px]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
