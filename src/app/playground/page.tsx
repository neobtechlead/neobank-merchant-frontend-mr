'use client'
import React, {useState, useEffect} from 'react';
import ProfileDropdown from "@/components/Profile/ProfileDropdown";
import MenuList from "@/components/menu/MenuList";

const Playground: React.FC = () => {

    return (
        <>
            <div className="min-h-full border">
                <nav className="">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between ">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-8 w-8"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                </div>
                            </div>

                            <div className="hidden md:block flex items-center md:ml-6">
                                <MenuList/>
                            </div>

                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <div className="relative ml-3">
                                        <div>
                                            <ProfileDropdown/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Playground;
