import React from 'react';
import Image from "next/image";
import NavigationLinks from "@/components/navigation/NavigationLinks";
import ProfileDropdown from "@/components/profile/ProfileDropdown";

const Header: React.FC = () => {
    return (
        <header className="w-screen bg-white shadow-sm lg:static lg:overflow-y-visible">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                    <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                        <div className="flex flex-shrink-0 items-center">
                            <div className="block h-8 w-auto">
                                <Image src="/assets/images/logo.png" alt="neobank" width={85} height={35} />
                            </div>
                        </div>
                    </div>
                    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                        <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                            <div className="w-full mx-auto">
                                <NavigationLinks />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:absolute md:inset-y-0 md:right-[30px] lg:hidden">
                        {/* Mobile menu button */}
                        <button type="button"
                                className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            {/* Icon when menu is closed */}
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            {/* Icon when menu is open */}
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:justify-end xl:col-span-4">
                        <ProfileDropdown />
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <nav className="lg:hidden" aria-label="Global">
                <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
                    <a href="#" aria-current="page"
                       className="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium">Dashboard</a>
                    <a href="#"
                       className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Calendar</a>
                    <a href="#" className="hover-bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Teams</a>
                    <a href="#"
                       className="hover-bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Directory</a>
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                    <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                 alt="" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">Chelsea Hagon</div>
                            <div className="text-sm font-medium text-gray-500">chelsea.hagon@example.com</div>
                        </div>
                        <button type="button"
                                className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover-text-gray-500 focus-outline-none focus-ring-2 focus-ring-indigo-500 focus-ring-offset-2">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" aria-hidden={true}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button>
                    </div>
                    <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                        <a href="#"
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover-bg-gray-50 hover-text-gray-900">Your
                            Profile</a>
                        <a href="#"
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover-bg-gray-50 hover-text-gray-900">Settings</a>
                        <a href="#"
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover-bg-gray-50 hover-text-gray-900">Sign
                            out</a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
