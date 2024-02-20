import React, {useEffect, useState} from 'react';
import NavigationLinks from "@/components/navigation/NavigationLinks";
import Logo from "@/assets/images/logo.svg";
import {useDashboardStore} from "@/store/DashboardStore";
import Image from "next/image";
import ProfileDropdown from "@/components/profile/ProfileDropdown";
import SupportButton from "@/components/SupportButton";
import SupportContent from "@/components/support/SupportContent";
import SettingsContent from "@/components/settings/SettingsContent";
import {IDashboardLayoutProps} from "@/utils/interfaces/IDashboardLayoutProps";
import ProfileContent from "@/components/profile/ProfileContent";
import {Dialog} from "@headlessui/react";
import Button from "@/components/forms/Button";
import Modal from "@/components/Modal";
import {useUserStore} from "@/store/UserStore";
import {useTransactionStore} from "@/store/TransactionStore";
import {logout} from "@/api/auth";

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({
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
        showBody,
        showSupportButton,
        showSupportContent,
        showProfile,
        showSettings,
        setShowHeader,
        setHeaderDescription,
        setHeaderTitle,
        setShowNavigation,
        setShowLogo,
        setShowProfileDropdown,
        setShowBackButton,
        setShowBody,
        setShowSupportContent,
        setShowProfile,
        setShowSettings,
        setNavTitle,
    } = useDashboardStore();

    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false)

    const handleSupportClicked = () => {
        setNavTitle('Support')
        setShowHeader(false)
        setShowBody(false)
        setShowSettings(false)
        setShowNavigation(false)
        setShowLogo(false)
        setShowProfileDropdown(false)
        setShowSupportContent(true)
        setShowBackButton(true)
    }

    const {
        user,
        setIsAuthenticated,
        resetUserStore
    } = useUserStore();
    const {resetTransactionStore} = useTransactionStore();

    useEffect(() => {
        showSupportContent ? setShowHeader(false) : setShowHeader(true)
        showNavigation ? handleShowBody() : null
    }, [setShowSupportContent, showNavigation])

    const handleProfileItemClicked = (item: string) => {

        if (item === 'logout') handleLogoutClicked()
        else {
            setShowBody(false)
            setShowSupportContent(false)
            setHeaderTitle("Account Information")
            setHeaderDescription("Put content for account information here. Put content for account information here. Put content for account information here. Put content for account information here. Put content for account information here.n")

            if (item === 'profile') handleProfileClicked()
            if (item === 'settings') handleSettingsClicked()
        }
    }

    const handleProfileClicked = () => {
        setShowSettings(false)
        setShowProfile(true)
    }

    const handleSettingsClicked = () => {
        setShowProfile(false)
        setShowSettings(true)
    }

    const handleLogoutClicked = () => {
        setLogoutModalOpen(true)
    }

    const handleLogoutAction = (action: string) => {
        if (action === 'yes') {
            if (user?.authToken) {
                logout(user?.authToken).then(async (response) => {
                    if (response.ok && await response.json()) {
                        if (setIsAuthenticated) setIsAuthenticated(false)
                        if (resetUserStore) resetUserStore()
                        if (resetTransactionStore) resetTransactionStore()
                        return setLogoutModalOpen(false)
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        } else
            return setLogoutModalOpen(false)
    }

    const handleShowBody = () => {
        setShowSupportContent(false)
        setShowHeader(true)
        setShowProfileDropdown(true)
        setShowBody(true)
        setShowProfile(false)
        setShowSettings(false)
        setNavTitle('')
    }

    return (
        <div>
            <div className={`sticky top-0 z-50 ${customStyles}`}>
                <nav
                    className="bg-white flex justify-between md:items-center px-6 pb-0 md:px-8 h-16 border border-b-gray-200">
                    <div className={`flex md:justify-start items-center ${logoStyles}`}>
                        {showLogo &&
                            <Image src={Logo} alt="CF Transact" width={0} height={35} style={{width: 'auto'}}/>}
                        {children.logo}
                    </div>

                    <div className="flex capitalize">
                        <div className="hidden md:flex md:justify-center">
                            {showNavigation && <NavigationLinks/>}
                        </div>
                        {children.navigationLinks}
                    </div>

                    <div className="flex justify-end items-center">
                        {showProfileDropdown && <ProfileDropdown onClick={handleProfileItemClicked}/>}
                        {children.profileDropdown}
                    </div>
                </nav>

                {showHeader && <div className="bg-white shadow-sm flex" style={{
                    background: 'url("/assets/images/cyan-background.svg")',
                    height: 147,
                }}>
                    <div
                        className={`w-full md:px-3 py-5 flex flex-col justify-center lg:ml-[90px] ${headerStyles}`}>
                        <div className="max-w-7xl flex flex-col">
                            <h1 className="text-lg font-semibold leading-6 text-gray-900">{headerTitle}</h1>
                            <p className="font-normal text-sm mt-2">{headerDescription}</p>
                        </div>
                    </div>
                </div>}
            </div>

            <div className="overflow-y-hidden md:mx-[12px] mx-auto">
                <div className="h-full md:px-3 lg:px-[70px]">
                    {showBody && <>{children.body}</>}
                    {showSupportContent && <SupportContent/>}
                    {showProfile && <ProfileContent/>}
                    {showSettings && <SettingsContent onClick={handleSettingsClicked}/>}
                </div>
            </div>

            {showSupportButton && <SupportButton onClick={handleSupportClicked}/>}

            <Modal showCloseButton={false} setModalOpen={setLogoutModalOpen} showModal={logoutModalOpen}
                   customClasses="z-50">
                <div className="flex justify-center">
                    <Image className="mt-10" src="/assets/icons/sign-out.svg" alt="logout" width={80}
                           height={80} style={{width: 80, height: 'auto'}}/>
                </div>

                <div className="flex flex-col p-5">
                    <div className="sm:flex sm:items-start justify-center my-10">
                        <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3"
                                          className="text-base font-bold text-lg text-gray-900 text-center">
                                Logout
                            </Dialog.Title>
                            <div className="mt-4">
                                <p className="text-md text-gray-900 text-center">
                                    Are you sure you want to logout of this portal?
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`sm:mt-4 flex gap-5`}>
                        <Button buttonType="button" styleType="tertiary"
                                customStyles="p-4 md:p-5 rounded-md border border-gray-300 bg-transparent"
                                onClick={() => handleLogoutAction('no')}>
                            <span className="text-gray-900 font-semibold">No</span>
                        </Button>
                        <Button buttonType="button" styleType="primary" customStyles="p-4 md:p-5 rounded-md"
                                onClick={() => handleLogoutAction('yes')}> Yes </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DashboardLayout;
